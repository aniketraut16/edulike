export type Material = {
  module_id: string;
  title: string;
  type: string;
  content: string;
  order_index: number;
  is_active: boolean;
};

export type VideoLinkMaterial = Material & {
  type: "video";
  file_path: string;
  duration: number;
};

export type GoogleMeetMaterial = Material & {
  type: "live_session";
  meet_link: string;
  scheduled_at: string;
};

export type ExternalLinkMaterial = Material & {
  type: "external_link";
  external_url: string;
};

export type DocumentMaterial = Material & {
  type: "document";
  file_path: string;
};
export type QuizMaterial = Material & {
  type: "quiz";
};

export type MaterialArgs =
  | VideoLinkMaterial
  | GoogleMeetMaterial
  | ExternalLinkMaterial
  | DocumentMaterial
  | QuizMaterial;

export type OneMaterial = {
  id: string;
  module_id: string;
  title: string;
  type: string;
  content: string | null;
  file_path: string;
  duration: number;
  order_index: number;
  is_preview: boolean;
  is_active: boolean;
  meet_link: string | null;
  scheduled_at: string | null;
  external_url: string | null;
  created_at: string;
  updated_at: string;
};
