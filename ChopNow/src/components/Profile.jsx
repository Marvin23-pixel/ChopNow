import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Settings,
  Camera,
  User,
  HelpCircle,
  HelpCircle as QuizIcon,
  Mail,
  ChevronRight,
  Home,
  Search,
  ReceiptText,
  Heart,
  Check,
  X,
} from "lucide-react";
import "../styles/profile.css";

// 10 Stylized Illustrated Avatars (5 Female, 5 Male) with expressive eyes and smiles
export const AVATARS = [
  // 5 Female Avatars
  {
    id: "female-1",
    name: "Long Curly",
    gender: "female",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="url(#bg-f1)"/>
      <path d="M50 18C36 18 26 28 26 44C26 52 30 64 50 67C70 64 74 52 74 44C74 28 64 18 50 18Z" fill="#2C1810"/>
      <circle cx="26" cy="44" r="13" fill="#2C1810"/>
      <circle cx="74" cy="44" r="13" fill="#2C1810"/>
      <circle cx="23" cy="58" r="11" fill="#2C1810"/>
      <circle cx="77" cy="58" r="11" fill="#2C1810"/>
      <circle cx="50" cy="50" r="23" fill="#E8BEAC"/>
      <circle cx="41" cy="48" r="2.5" fill="#2C1810"/>
      <circle cx="59" cy="48" r="2.5" fill="#2C1810"/>
      <path d="M46 57C47.5 59 52.5 59 54 57" stroke="#2C1810" stroke-width="2" stroke-linecap="round"/>
      <path d="M38 72C38 60 62 60 62 72V88H38V72Z" fill="#F95E14"/>
      <defs><linearGradient id="bg-f1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#35221F"/><stop offset="1" stop-color="#1E1E1E"/></linearGradient></defs>
    </svg>`,
  },
  {
    id: "female-2",
    name: "Braided",
    gender: "female",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="url(#bg-f2)"/>
      <path d="M24 44C24 26 35 18 50 18C65 18 76 26 76 44V78H62V50C62 44 57 38 50 38C43 38 38 44 38 50V78H24V44Z" fill="#1A1A1A"/>
      <circle cx="50" cy="48" r="21" fill="#C68B59"/>
      <circle cx="41" cy="46" r="2.5" fill="#1A1A1A"/>
      <circle cx="59" cy="46" r="2.5" fill="#1A1A1A"/>
      <path d="M46 56C47.5 58 52.5 58 54 56" stroke="#1A1A1A" stroke-width="2" stroke-linecap="round"/>
      <path d="M36 75C36 62 64 62 64 75V90H36V75Z" fill="#FFB59A"/>
      <defs><linearGradient id="bg-f2" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#2D2327"/><stop offset="1" stop-color="#151515"/></linearGradient></defs>
    </svg>`,
  },
  {
    id: "female-3",
    name: "Short Natural",
    gender: "female",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="url(#bg-f3)"/>
      <path d="M28 40C28 23 38 18 50 18C62 18 72 23 72 40C72 49 66 54 50 54C34 54 28 49 28 40Z" fill="#1F1612"/>
      <circle cx="50" cy="51" r="22" fill="#8D5524"/>
      <circle cx="41" cy="49" r="2.5" fill="#1F1612"/>
      <circle cx="59" cy="49" r="2.5" fill="#1F1612"/>
      <path d="M46 58C47.5 60 52.5 60 54 58" stroke="#1F1612" stroke-width="2" stroke-linecap="round"/>
      <path d="M35 74C35 62 65 62 65 74V90H35V74Z" fill="#E85D04"/>
      <defs><linearGradient id="bg-f3" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#30221E"/><stop offset="1" stop-color="#121212"/></linearGradient></defs>
    </svg>`,
  },
  {
    id: "female-4",
    name: "Long Straight",
    gender: "female",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="url(#bg-f4)"/>
      <path d="M28 34C28 22 38 18 50 18C62 18 72 22 72 34V82H60V42H40V82H28V34Z" fill="#24140D"/>
      <circle cx="50" cy="48" r="21" fill="#F0C2B0"/>
      <circle cx="41" cy="46" r="2.5" fill="#24140D"/>
      <circle cx="59" cy="46" r="2.5" fill="#24140D"/>
      <path d="M46 56C47.5 58 52.5 58 54 56" stroke="#24140D" stroke-width="2" stroke-linecap="round"/>
      <path d="M38 72C38 60 62 60 62 72V90H38V72Z" fill="#D05315"/>
      <defs><linearGradient id="bg-f4" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#3D2924"/><stop offset="1" stop-color="#1A1A1A"/></linearGradient></defs>
    </svg>`,
  },
  {
    id: "female-5",
    name: "Modern Hijab",
    gender: "female",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="url(#bg-f5)"/>
      <path d="M30 28C30 16 38 13 50 13C62 13 70 16 70 28V85H30V28Z" fill="#D97706"/>
      <circle cx="50" cy="51" r="19" fill="#B0653B"/>
      <circle cx="42" cy="49" r="2.5" fill="#221100"/>
      <circle cx="58" cy="49" r="2.5" fill="#221100"/>
      <path d="M46 58C47.5 60 52.5 60 54 58" stroke="#221100" stroke-width="2" stroke-linecap="round"/>
      <path d="M35 75C35 64 65 64 65 75V90H35V75Z" fill="#4B5563"/>
      <defs><linearGradient id="bg-f5" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#452C16"/><stop offset="1" stop-color="#1A1A1A"/></linearGradient></defs>
    </svg>`,
  },

  // 5 Male Avatars
  {
    id: "male-1",
    name: "Short Curly",
    gender: "male",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="url(#bg-m1)"/>
      <path d="M30 38C30 24 38 20 50 20C62 20 70 24 70 38C70 42 66 46 50 46C34 46 30 42 30 38Z" fill="#1C1410"/>
      <circle cx="50" cy="52" r="22" fill="#A0633C"/>
      <circle cx="41" cy="50" r="2.5" fill="#1C1410"/>
      <circle cx="59" cy="50" r="2.5" fill="#1C1410"/>
      <path d="M46 59C47.5 61 52.5 61 54 59" stroke="#1C1410" stroke-width="2" stroke-linecap="round"/>
      <path d="M34 74C34 60 66 60 66 74V90H34V74Z" fill="#1E3A8A"/>
      <defs><linearGradient id="bg-m1" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#242B35"/><stop offset="1" stop-color="#121212"/></linearGradient></defs>
    </svg>`,
  },
  {
    id: "male-2",
    name: "Fade Haircut",
    gender: "male",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="url(#bg-m2)"/>
      <path d="M34 36C34 22 41 19 50 19C59 19 66 22 66 36V42H34V36Z" fill="#111827"/>
      <circle cx="50" cy="52" r="22" fill="#D29871"/>
      <circle cx="41" cy="50" r="2.5" fill="#111827"/>
      <circle cx="59" cy="50" r="2.5" fill="#111827"/>
      <path d="M46 59C47.5 61 52.5 61 54 59" stroke="#111827" stroke-width="2" stroke-linecap="round"/>
      <path d="M34 74C34 60 66 60 66 74V90H34V74Z" fill="#047857"/>
      <defs><linearGradient id="bg-m2" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#1A2E26"/><stop offset="1" stop-color="#121212"/></linearGradient></defs>
    </svg>`,
  },
  {
    id: "male-3",
    name: "Short Afro",
    gender: "male",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="url(#bg-m3)"/>
      <circle cx="50" cy="36" r="23" fill="#1C1410"/>
      <circle cx="50" cy="52" r="21" fill="#5C3820"/>
      <circle cx="41" cy="50" r="2.5" fill="#1C1410"/>
      <circle cx="59" cy="50" r="2.5" fill="#1C1410"/>
      <path d="M46 59C47.5 61 52.5 61 54 59" stroke="#1C1410" stroke-width="2" stroke-linecap="round"/>
      <path d="M35 74C35 60 65 60 65 74V90H35V74Z" fill="#B91C1C"/>
      <defs><linearGradient id="bg-m3" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#361B1B"/><stop offset="1" stop-color="#121212"/></linearGradient></defs>
    </svg>`,
  },
  {
    id: "male-4",
    name: "Dreadlocks",
    gender: "male",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="url(#bg-m4)"/>
      <path d="M28 36C28 20 38 18 50 18C62 18 72 20 72 36V70H62V42H38V70H28V36Z" fill="#18110D"/>
      <circle cx="50" cy="52" r="21" fill="#8D5524"/>
      <circle cx="41" cy="50" r="2.5" fill="#18110D"/>
      <circle cx="59" cy="50" r="2.5" fill="#18110D"/>
      <path d="M46 59C47.5 61 52.5 61 54 59" stroke="#18110D" stroke-width="2" stroke-linecap="round"/>
      <path d="M34 74C34 60 66 60 66 74V90H34V74Z" fill="#7C3AED"/>
      <defs><linearGradient id="bg-m4" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#2C203B"/><stop offset="1" stop-color="#121212"/></linearGradient></defs>
    </svg>`,
  },
  {
    id: "male-5",
    name: "Clean-cut",
    gender: "male",
    svg: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="url(#bg-m5)"/>
      <path d="M34 34C34 22 41 18 50 18C59 18 66 22 66 34V40H34V34Z" fill="#262626"/>
      <circle cx="50" cy="52" r="22" fill="#E8BEAC"/>
      <circle cx="41" cy="50" r="2.5" fill="#262626"/>
      <circle cx="59" cy="50" r="2.5" fill="#262626"/>
      <path d="M46 59C47.5 61 52.5 61 54 59" stroke="#262626" stroke-width="2" stroke-linecap="round"/>
      <path d="M34 74C34 60 66 60 66 74V90H34V74Z" fill="#1D4ED8"/>
      <defs><linearGradient id="bg-m5" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse"><stop stop-color="#1E293B"/><stop offset="1" stop-color="#121212"/></linearGradient></defs>
    </svg>`,
  },
];

export default function Profile() {
  const [selectedAvatarId, setSelectedAvatarId] = useState(() => {
    return (
      localStorage.getItem("chopnow_selected_avatar") || AVATARS[0].id
    );
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedId, setTempSelectedId] =
    useState(selectedAvatarId);

  useEffect(() => {
    localStorage.setItem(
      "chopnow_selected_avatar",
      selectedAvatarId
    );
  }, [selectedAvatarId]);

  const currentAvatar =
    AVATARS.find((a) => a.id === selectedAvatarId) || AVATARS[0];

  const handleBackClick = () => {
    window.history.back();
  };

  const handleSettingsClick = () => {
    window.location.hash = "#settings";
  };

  const handleOpenAvatarModal = () => {
    setTempSelectedId(selectedAvatarId);
    setIsModalOpen(true);
  };

  const handleCloseAvatarModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveAvatar = () => {
    setSelectedAvatarId(tempSelectedId);
    setIsModalOpen(false);
  };

 const handleEditProfile = () => {
  window.location.hash = "#edit-profile";
};
  const handleEditField = (fieldName) => {};
  const handleHelpCenter = () => {};
  const handleFaqs = () => {};
  const handleContactSupport = () => {};

  const handleLogOut = () => {
    window.location.hash = "#login";
  };

  return (
    <div className="profile-page-root">
      {/* TopAppBar */}
      <header className="profile-top-app-bar">
        <button
          type="button"
          aria-label="Go back"
          className="profile-icon-btn profile-primary-text"
          onClick={handleBackClick}
        >
          <ArrowLeft size={24} />
        </button>

        <h1 className="profile-app-bar-title">Profile</h1>

        <button
          type="button"
          aria-label="Settings"
          className="profile-icon-btn profile-primary-text"
          onClick={handleSettingsClick}
        >
          <Settings size={24} />
        </button>
      </header>

      {/* Main Content */}
      <main className="profile-main-content">
        {/* Header Section */}
        <section className="profile-header-section">
          <div className="profile-avatar-container">
            <div
              className="profile-avatar-img-wrapper"
              dangerouslySetInnerHTML={{
                __html: currentAvatar.svg,
              }}
              aria-label={currentAvatar.name}
            />

            <button
              type="button"
              aria-label="Change avatar"
              className="profile-camera-btn"
              onClick={handleOpenAvatarModal}
            >
              <Camera size={16} />
            </button>
          </div>

          <h2 className="profile-user-name">Tobi Eniola</h2>

          <p className="profile-user-email">
            tobi@example.com
          </p>

          <button
            type="button"
            className="profile-edit-profile-btn"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        </section>

        {/* Personal Info */}
        <section className="profile-glass-card">
          <h3 className="profile-card-heading">
            <User size={18} className="profile-heading-icon" />
            Personal Info
          </h3>

          <div className="profile-info-list">
            <div className="profile-info-row profile-border-bottom">
              <div>
                <p className="profile-info-label">Full Name</p>
                <p className="profile-info-value">
                  Tobi Eniola
                </p>
              </div>

              <button
                type="button"
                className="profile-action-link"
                onClick={() => handleEditField("fullName")}
              >
                
              </button>
            </div>

            <div className="profile-info-row profile-border-bottom">
              <div>
                <p className="profile-info-label">Email</p>
                <p className="profile-info-value">
                  tobi@example.com
                </p>
              </div>

              <button
                type="button"
                className="profile-action-link"
                onClick={() => handleEditField("email")}
              >
                
              </button>
            </div>

            <div className="profile-info-row">
              <div>
                <p className="profile-info-label">Phone</p>
                <p className="profile-info-value">
                  +234 801 234 5678
                </p>
              </div>

              <button
                type="button"
                className="profile-action-link"
                onClick={() => handleEditField("phone")}
              >
                
              </button>
            </div>
          </div>
        </section>

        {/* Support */}
        <section className="profile-glass-card">
          <h3 className="profile-card-heading">
            <HelpCircle
              size={18}
              className="profile-heading-icon"
            />
            Support
          </h3>

          <div className="profile-support-list">
            <button
              type="button"
              className="profile-support-btn"
              onClick={handleHelpCenter}
            >
              <HelpCircle
                size={20}
                className="profile-support-icon"
              />

              <span className="profile-support-text">
                Help Center
              </span>

              <ChevronRight
                size={20}
                className="profile-chevron-icon"
              />
            </button>

            <button
              type="button"
              className="profile-support-btn"
              onClick={handleFaqs}
            >
              <QuizIcon
                size={20}
                className="profile-support-icon"
              />

              <span className="profile-support-text">
                FAQs
              </span>

              <ChevronRight
                size={20}
                className="profile-chevron-icon"
              />
            </button>

            <button
              type="button"
              className="profile-support-btn"
              onClick={handleContactSupport}
            >
              <Mail
                size={20}
                className="profile-support-icon"
              />

              <span className="profile-support-text">
                Contact Support
              </span>

              <ChevronRight
                size={20}
                className="profile-chevron-icon"
              />
            </button>
          </div>
        </section>

        {/* Log Out */}
        <div className="profile-logout-wrap">
          <button
            type="button"
            className="profile-logout-btn"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </main>

      {/* Avatar Selection Modal */}
      {isModalOpen && (
        <div className="profile-modal-overlay">
          <div className="profile-modal-container">
            <div className="profile-modal-header">
              <h3 className="profile-modal-title">
                Choose Your Avatar
              </h3>

              <button
                type="button"
                className="profile-modal-close-btn"
                onClick={handleCloseAvatarModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <div className="profile-modal-body">
              <div className="profile-avatar-grid">
                {AVATARS.map((avatar) => {
                  const isSelected =
                    tempSelectedId === avatar.id;

                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      className={`profile-avatar-option ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() =>
                        setTempSelectedId(avatar.id)
                      }
                    >
                      <div
                        className="profile-avatar-option-svg"
                        dangerouslySetInnerHTML={{
                          __html: avatar.svg,
                        }}
                      />

                      {isSelected && (
                        <div className="profile-avatar-check-badge">
                          <Check size={14} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="profile-modal-footer">
              <button
                type="button"
                className="profile-modal-btn-cancel"
                onClick={handleCloseAvatarModal}
              >
                Cancel
              </button>

              <button
                type="button"
                className="profile-modal-btn-save"
                onClick={handleSaveAvatar}
              >
                Save Avatar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BottomNavBar */}
      <nav className="profile-bottom-nav">
        <button
          type="button"
          className="profile-nav-item"
          onClick={() => {
            window.location.hash = "#home";
          }}
        >
          <Home size={22} className="profile-nav-icon" />
          <span className="profile-nav-label">Home</span>
        </button>

        <button
          type="button"
          className="profile-nav-item"
          onClick={() => {
            window.location.hash = "#stores";
          }}
        >
          <Search size={22} className="profile-nav-icon" />
          <span className="profile-nav-label">Browse</span>
        </button>

        <button
          type="button"
          className="profile-nav-item"
          onClick={() => {
            window.location.hash = "#orders";
          }}
        >
          <ReceiptText
            size={22}
            className="profile-nav-icon"
          />
          <span className="profile-nav-label">Orders</span>
        </button>

        <button
          type="button"
          className="profile-nav-item"
          onClick={() => {
            window.location.hash = "#favorites";
          }}
        >
          <Heart size={22} className="profile-nav-icon" />
          <span className="profile-nav-label">Favorites</span>
        </button>

        <button
          type="button"
          className="profile-nav-profile-btn"
          onClick={() => {
            window.location.hash = "#profile";
          }}
        >
          <User
            size={22}
            className="profile-nav-icon-filled"
          />
          <span className="profile-nav-label">Profile</span>
        </button>
      </nav>
    </div>
  );
}