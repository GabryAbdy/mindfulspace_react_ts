export type SoundMeta = {
  freesoundId: number;
  displayName: string;
};

export type SoundPlayable = {
  status: "success";
  previewUrl: string;
};

export type SoundUnavailable = {
  status: "error";
  message: string;
};

export type SoundFetchResult = SoundPlayable | SoundUnavailable;

export type SoundWithStatus = SoundMeta & {
  fetchResult: SoundFetchResult;
};
