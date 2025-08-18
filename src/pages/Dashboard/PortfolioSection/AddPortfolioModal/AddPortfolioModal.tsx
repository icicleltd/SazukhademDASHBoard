import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Upload,
  Button,
  message,
  AutoComplete,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAddNewPortfolioMutation } from "../../../../redux/services/portfolioApi/portfolioApi";
import Swal from "sweetalert2";

interface AddPortfolioModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const categoryOptions = [
  "As an Actor",
  "As a Director",
  "As a Theatre Set Designer",
  "As a Mentor",
  "As a Judge",
  "As an Anchor",
  "As a Canvas Creator",
].map((option) => ({ value: option }));

const AddPortfolioModal: React.FC<AddPortfolioModalProps> = ({
  open,
  setOpen,
}) => {
  const [form] = Form.useForm();
  const [addNewPortfolio, { isLoading }] = useAddNewPortfolioMutation();
  const [fileList, setFileList] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("");

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setFileList([]);
    setCategory("");
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      // Validate required fields
      if (!fileList.length || !fileList[0].originFileObj) {
        message.error("Please upload a valid image file");
        return;
      }

      if (!category) {
        message.error("Please select a category");
        return;
      }

      // Create FormData with all required fields
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("categories", category);
      formData.append("image", fileList[0].originFileObj); // Make sure this is the File object

      // Debug: Log FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Call the mutation
      const response = await addNewPortfolio(formData).unwrap();

      if (response?.success) {
        Swal.fire({
          icon: "success",
          title: "Added successfully.",
          text: "Item Added successfully. Please Check..!",
        });
      }

      message.success("Portfolio added successfully!");
      handleCancel();
    } catch (error) {
      console.error("Submission error:", error);
      message.error(
        "Failed to add portfolio. Please check all required fields."
      );
    }
  };

  const uploadProps = {
    onRemove: () => setFileList([]),
    beforeUpload: (file: File) => {
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

      setFileList([
        {
          uid: file.name,
          name: file.name,
          status: "done",
          originFileObj: file,
        },
      ]);
      return false;
    },
    fileList,
    maxCount: 1,
    accept: "image/*",
  };

  return (
    <Modal
      title="Add New Portfolio"
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
          Add Portfolio
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
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          <div className="text-xs text-gray-500 mt-1">
            Only image files (max 10MB)
          </div>
        </Form.Item>

        <Form.Item
          label="Category"
          required
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <AutoComplete
            options={categoryOptions}
            placeholder="Select a category"
            value={category}
            onChange={setCategory}
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPortfolioModal;
