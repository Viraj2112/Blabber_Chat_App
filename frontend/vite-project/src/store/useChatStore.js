import { create } from "zustand";

import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    fetchUsers: async () => {
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get('/messages/users');
            set({users: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isUsersLoading:false});
        }
    },

    fetchMessages: async (id) => {
        set({isMessagesLoading:true});
        try {
            const res = await axiosInstance.get(`/messages/${id}`);
            set({messages: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({isMessagesLoading:false});
        }
    },

    sendMessage: async (message) => {
        const { messages, selectedUser } = get();
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, message);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        // optimize this one later
        socket.on("newMessage", (message) => {
            const isMessageSentFromSelectedUser = message.senderId === selectedUser._id;
            if(!isMessageSentFromSelectedUser) return;

            set({messages: [...get().messages, message]});
        });

    },
    unsubscribeFromMessages: () => {
        // Close the WebSocket connection
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => {
        set({selectedUser: selectedUser});
    }




}))