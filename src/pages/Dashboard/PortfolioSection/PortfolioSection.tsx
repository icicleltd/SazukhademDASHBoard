import React, { useEffect, useState } from "react";
import { Play, ZoomIn } from "lucide-react";
import UpdatePortfolioModal from "./UpdatePortfolioModal/UpdatePortfolioModal";
import AddPortfolioModal from "./AddPortfolioModal/AddPortfolioModal";
import { useGetAllPortfolioQuery } from "../../../redux/services/portfolioApi/portfolioApi";

// Define types for the component
interface Tab {
  id: TabId;
  label: string;
}

type TabId =
  | "ALL"
  | "As an Actor"
  | "As a Director"
  | "As a Theatre Set Designer"
  | "As a Mentor"
  | "As a Judge"
  | "As an Anchor"
  | "As a Canvas Creator";

interface Work {
  _id: string;
  title: string;
  image: string;
  categories: string;
  hasVideo?: boolean;
}

interface VisibleWork extends Work {
  isVisible: boolean;
}

const PortfolioSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("ALL");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [visibleWorks, setVisibleWorks] = useState<VisibleWork[]>([]);
  const [updatePortfolioModalOpen, setUpdatePortfolioModalOpen] =
    useState(false);
  const [addPortfolioModalOpen, setAddPortfolioModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Work | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const { data: getAllPortfolio } = useGetAllPortfolioQuery(undefined);
  const portfolioData = getAllPortfolio?.data || [];

  const tabs: Tab[] = [
    { id: "ALL", label: "ALL" },
    { id: "As an Actor", label: " Actor" },
    { id: "As a Director", label: "Director" },
    { id: "As a Theatre Set Designer", label: "Theatre Set Designer" },
    { id: "As a Canvas Creator", label: "Canvas Creator" },
    { id: "As a Mentor", label: "Mentor" },
    { id: "As a Judge", label: "Judge" },
    { id: "As an Anchor", label: "Anchor" },
  ];

  const handleTabChange = (tabId: TabId): void => {
    setIsAnimating(true);
    setActiveTab(tabId);

    setVisibleWorks((current) =>
      current.map((work) => ({ ...work, isVisible: false }))
    );

    setTimeout(() => {
      const filtered = portfolioData
        .filter((work: any) =>
          tabId === "ALL" ? true : work.categories === tabId
        )
        .map((work: any) => ({ ...work, isVisible: true }));
      setVisibleWorks(filtered);
      setIsAnimating(false);
    }, 300);
  };

  const openModal = (work: Work) => {
    setSelectedImage(work);
    setCurrentImageIndex(visibleWorks.findIndex((w) => w._id === work._id));
    setUpdatePortfolioModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setUpdatePortfolioModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "unset";
  };

  const navigateImage = (direction: "prev" | "next") => {
    const currentVisibleWorks = visibleWorks.filter((work) => work.isVisible);
    let newIndex;

    if (direction === "next") {
      newIndex =
        currentImageIndex >= currentVisibleWorks.length - 1
          ? 0
          : currentImageIndex + 1;
    } else {
      newIndex =
        currentImageIndex <= 0
          ? currentVisibleWorks.length - 1
          : currentImageIndex - 1;
    }

    setCurrentImageIndex(newIndex);
    setSelectedImage(currentVisibleWorks[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!updatePortfolioModalOpen) return;

      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowLeft") {
        navigateImage("prev");
      } else if (e.key === "ArrowRight") {
        navigateImage("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [updatePortfolioModalOpen, currentImageIndex]);

  // Initialize visible works
  useEffect(() => {
    if (portfolioData.length > 0) {
      setVisibleWorks(
        portfolioData.map((work: any) => ({ ...work, isVisible: true }))
      );
    }
  }, [portfolioData]);

  return (
    <>
      <div className="flex justify-end">
        <button
          onClick={() => setAddPortfolioModalOpen(true)}
          className="border px-4 py-2 mb-3 font-bold bg-indigo-500 text-white rounded-lg"
        >
          Add An Item
        </button>
      </div>
      <div id="works" className="min-h-screen bg-gray-900 pt-12">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl text-white font-bold mb-4 uppercase">
              Portfolio
            </h2>
            <p className="text-gray-400 italic">
              A SELECTION OF DIFFERENT PROJECTS
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => !isAnimating && handleTabChange(tab.id)}
                className={`px-6 py-2 rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-orange-500 text-white scale-110"
                    : "text-white border border-gray-700 hover:bg-orange-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Works Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleWorks?.slice(0, 6)?.map((work) => (
              <div
                key={work._id}
                className={`transform transition-all duration-300 cursor-pointer ${
                  work.isVisible
                    ? "scale-100 opacity-100"
                    : "scale-50 opacity-0"
                }`}
                onClick={() => openModal(work)}
              >
                <div className="group relative overflow-hidden transition-transform duration-300 hover:-translate-y-2">
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex items-center space-x-4">
                        {work.hasVideo && (
                          <button
                            className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <Play className="w-6 h-6 text-white" />
                          </button>
                        )}
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black to-transparent">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {work.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-300">
                        {work.categories}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {updatePortfolioModalOpen && selectedImage && (
        <UpdatePortfolioModal
          open={updatePortfolioModalOpen}
          setOpen={setUpdatePortfolioModalOpen}
          selectedItem={selectedImage}
        />
      )}
      {addPortfolioModalOpen && (
        <AddPortfolioModal
          open={addPortfolioModalOpen}
          setOpen={setAddPortfolioModalOpen}
        />
      )}
    </>
  );
};

export default PortfolioSection;
