import GunType from "./gunType";

type GunTypeAttachmentRestriction = {
  restrictionType: 'byGunType';
  gunType: GunType;
};

type SpecifiedGunAttachmentRestriction = {
  restrictionType: 'byName';
  gunName: string;
}

type BaseAttachmentRestriction = {
  attachment: string;
};

type AttachmentRestriction = BaseAttachmentRestriction & (
  GunTypeAttachmentRestriction | SpecifiedGunAttachmentRestriction
);

export default AttachmentRestriction;
