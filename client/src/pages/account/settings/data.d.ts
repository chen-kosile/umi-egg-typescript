export interface TagType {
  key: string;
  label: string;
}

export interface GeographicItemType {
  name: string;
  id: string;
}

export interface GeographicType {
  province: GeographicItemType;
  city: GeographicItemType;
}

export interface NoticeType {
  id: string;
  title: string;
  logo: string;
  description: string;
  updatedAt: string;
  member: string;
  href: string;
  memberLink: string;
}

export interface CurrentUser {
  avatar?: string;
  username?: string;
  title?: string;
  group?: string;
  signature?: string;
  userId?: string;
  email?: string;
  unreadCount?: number;
  name?: string;
  parentGroup?: string;
  level?: number;
}
