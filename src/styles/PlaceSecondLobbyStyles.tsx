import styled from 'styled-components/native';

export const MainScreen = styled.View``;

export const SecondCategoriesWrapper = styled.View`
  padding: 20px 10px;
`;

export const SecondCategoriesGrid = styled.FlatList.attrs(() => ({
  columnWrapperStyle: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
}))``;

// export const SecondCategoriesGrid = styled.FlatList`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   background-color: #00008b;
//   margin-bottom: 10px;
// `;

// styled.ScrollView.attrs(() => ({
//   contentContainerStyle: {
//     alignItems: 'center',
//   },
// }))``;
//
export const SecondCategoryButton = styled.TouchableOpacity`
  width: 49%;
  border-width: 0.5px;
  border-color: #dfdfdf;
  border-radius: 11px;
`;

export const SecondCategoryButtonWrapper = styled.View`
  flex-direction: row;
  padding: 12px 14px;
`;

export const SecondCategoryButtonEmoji = styled.Text`
  color: black;
  margin-right: 6px;
`;

export const SecondCategoryButtonName = styled.Text`
  color: black;
`;
