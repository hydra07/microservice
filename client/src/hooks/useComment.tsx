import { useCallback, useState } from 'react';

export default function useComment() {
  const [openReplyId, setOpenReplyId] = useState<string | null>(null);

  const toggleReply = useCallback((commentId: string) => {
    setOpenReplyId((prevId) => (prevId === commentId ? null : commentId));
  }, []);

  const closeAllReplies = useCallback(() => {
    setOpenReplyId(null);
  }, []);

  return {
    openReplyId,
    toggleReply,
    closeAllReplies,
    isReplyOpen: (commentId: string) => openReplyId === commentId,
  };
}
