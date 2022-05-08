export type PlaceTabStackParamList = {
  PlaceLobby: undefined;
  PlaceSecondLobby: {firstCategoryId: string};
  ServiceLobby: undefined;
  CurationLobby: undefined;
  CurationDisplay: undefined;
  StoreDisplay: {
    initialFocus: string;
    firstCategoryId: string;
    secondCategoryId: string;
    secondCategories: string[];
  };
  StoreDetail: undefined;
  ServiceDisplay: undefined;
  ServiceDetail: undefined;
  Login: undefined;
  Register: undefined;
  PwReset: undefined;
  Profile: undefined;
};
