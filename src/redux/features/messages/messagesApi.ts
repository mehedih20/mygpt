import { supabase } from "@/lib/supabaseClient";
import { baseApi } from "@/redux/api/baseApi";

const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      async queryFn(chatId: string) {
        const { data } = await supabase
          .from("messages")
          .select("messageType, text")
          .eq("chatId", parseInt(chatId as string))
          .order("created_at", { ascending: true });

        return { data: data || [] };
      },
    }),
    createMessage: builder.mutation({
      async queryFn({
        messageType,
        text,
        chatId,
      }: {
        messageType: string;
        text: string;
        chatId: string;
      }) {
        await supabase.from("messages").insert([
          {
            messageType,
            text,
            chatId: parseInt(chatId),
          },
        ]);

        return { data: {} };
      },
      invalidatesTags: ["chat"],
    }),
  }),
});

export const { useGetMessagesQuery, useCreateMessageMutation } = messagesApi;
