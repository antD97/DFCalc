
type AttachmentRestriction = {
  type: 'excludeAttachment'
  gun: { type: 'name', name: string } | { type: 'all' };
  attachment: { type: 'name', name: string } | { type: 'all' };
} | {
  type: 'requireAttachment'
  gun: string;
  attachment: string;
};

export default AttachmentRestriction;
