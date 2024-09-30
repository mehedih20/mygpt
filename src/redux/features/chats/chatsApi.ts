import { supabase } from "@/lib/supabaseClient";
import { baseApi } from "@/redux/api/baseApi";

const chatsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query({
      async queryFn() {
        const { data, error } = await supabase.from("chats").select("*");
        if (error) {
          console.error("Error fetching chats:", error);
        }
        return { data: data || [] };
      },
      providesTags: ["chats"],
    }),
    createChat: builder.mutation({
      async queryFn({}) {
        const { data, error } = await supabase
          .from("chats")
          .insert([
            {
              chatName: "New Chat",
            },
          ])
          .select("id")
          .single();

        if (error) {
          console.error("Error creating chat:", error);
        }

        return { data: data };
      },
      invalidatesTags: ["chats"],
    }),
  }),
});

export const { useGetChatsQuery, useCreateChatMutation } = chatsApi;
