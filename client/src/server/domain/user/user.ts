export interface UserEntity {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}

/**
 * 再構成
 */
export const reconstructUserEntity = (params: {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
}): UserEntity => {
  return {
    id: params.id,
    name: params.name,
    email: params.email,
    imageUrl: params.imageUrl,
  };
};
