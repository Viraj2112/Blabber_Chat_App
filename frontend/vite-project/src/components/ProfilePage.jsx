import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [updatedImg, setUpdatedImg] = useState(null);

  const navigate = useNavigate();

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setUpdatedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  }

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
      toast.error("Please Login to View your Profile.")
    }
  }, [authUser, navigate]);

  if(!authUser) return null;


  return (
    <>
      <div className="w-full px-4 py-6 lg:max-w-md lg:mx-auto lg:bg-base-300 lg:shadow-lg lg:rounded-2xl lg:p-6 relative top-20">
        {/* Profile Image and Change Button */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src={updatedImg || authUser?.profilePic || "./avatar.png"}
              alt="Profile Pic"
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 ${
                isUpdatingProfile ? "blur-sm" : ""
              }`}
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute -bottom-2 -right-2 text-xs px-3 py-1 rounded-full ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="size-5 text-base-200" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Your Profile</h2>
            <p className="text-sm">
              {isUpdatingProfile ? "Uploading..." : "Manage your personal info"}
            </p>
          </div>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium ">Full Name</label>
            <input
              type="text"
              value={authUser?.fullName}
              readOnly
              className="mt-1 w-full bg-base-200 border rounded-lg px-4 py-2 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={authUser?.email}
              readOnly
              className="mt-1 w-full bg-base-200 border rounded-lg px-4 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Account Information */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3">Account Information</h3>
          <div className="flex justify-between text-sm mb-2">
            <span>Member Since:</span>
            <span>{authUser?.createdAt?.split("T")[0]}</span>
          </div>
          <div className="flex justify-between text-sm ">
            <span>Account Status:</span>
            <span className="font-medium text-green-600">Active</span>
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default ProfilePage;
