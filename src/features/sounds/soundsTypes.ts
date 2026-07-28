export type SoundMeta = {
  freesoundId: number;
  displayName: string;
};

export type SoundPlayable = {
  status: "success";
  freesoundId: number;
  previewUrl: string;
};

export type SoundUnavailable = {
  status: "error";
  freesoundId: number;
  message: string;
};

export type SoundFetchResult = SoundPlayable | SoundUnavailable;
