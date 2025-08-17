import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Switch, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { useUpdateSinglePortfolioMutation } from "../../../../redux/services/portfolioApi/portfolioApi";

interface UpdatePortfolioModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedItem: any;
}

const UpdatePortfolioModal: React.FC<UpdatePortfolioModalProps> = ({
  open,
  setOpen,
  selectedItem,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [updateSinglePortfolio, { isLoading }] = useUpdateSinglePortfolioMutation();

  useEffect(() => {
    if (open && selectedItem) {
      form.setFieldsValue({
        title: selectedItem.title,
        categories: selectedItem.categories,
        isVisible: selectedItem.isVisible,
      });

      if (selectedItem.image) {
        setFileList([{
          uid: '-1',
          name: 'current-image',
          status: 'done',
          url: selectedItem.image,
        }]);
      }
      setIsImageChanged(false);
    }
  }, [open, selectedItem, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("categories", values.categories);

      // Handle image upload
      if (isImageChanged) {
        if (fileList.length > 0 && fileList[0].originFileObj) {
          formData.append("image", fileList[0].originFileObj);
        } else {
          // If image was removed
          formData.append("image", "");
        }
      } else {
        // Keep existing image
        formData.append("image", selectedItem.image);
      }

      // Debug: Verify FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await updateSinglePortfolio({
        id: selectedItem._id,
        updatedData: formData
      }).unwrap();

      message.success("Portfolio updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Update failed:", error);
      message.error("Failed to update portfolio. Please try again.");
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const uploadProps: UploadProps = {
    onRemove: () => {
      setFileList([]);
      setIsImageChanged(true);
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return false;
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("Image must be smaller than 10MB!");
        return false;
      }

      setFileList([file]);
      setIsImageChanged(true);
      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
    fileList,
    maxCount: 1,
    accept: "image/*",
  };

  return (
    <Modal
      title="Update Portfolio"
      centered
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
      width="50%"
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button 
          key="submit" 
          type="primary" 
          onClick={handleOk}
          loading={isLoading}
        >
          Update
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input placeholder="Enter portfolio title" />
        </Form.Item>

        <Form.Item 
          label="Image"
          required
          rules={[{ required: true, message: "Please upload an image!" }]}
        >
          <Upload {...uploadProps} listType="picture">
            <Button icon={<UploadOutlined />}>
              {fileList.length ? 'Change Image' : 'Upload Image'}
            </Button>
          </Upload>
          <div className="text-xs text-gray-500 mt-1">
            {fileList.length ? 'Image selected' : 'No image selected'}
          </div>
        </Form.Item>

        <Form.Item
          name="categories"
          label="Categories"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Input placeholder="Enter category" />
        </Form.Item>

        <Form.Item name="isVisible" label="Visible" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePortfolioModal;