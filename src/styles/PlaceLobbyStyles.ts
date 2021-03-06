import styled from 'styled-components/native';

export const SafeAreaView = styled.SafeAreaView`
  background-color: #f6f6f6;
`;

export const ScrollView = styled.ScrollView`
  z-index: 0;
`;

export const ScrollWrapper = styled.View`
  background-color: #f6f6f6;
`;

export const ContentsWrapper = styled.View`
  z-index: 1;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom-right-radius: 15px;
  border-bottom-left-radius: 15px;
  background-color: white;
  padding-top: 70px;
`;

export const ButtonsWrapper = styled.View`
  display: flex;
  width: 100%;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;

export const ButtonLargeContainer = styled.TouchableOpacity`
  flex-direction: column;
  padding: 8px;
  background-color: #f8f8f8;
  border-width: 0.7px;
  border-color: #dfdfdf;
  width: 49%;
  height: 185px;
  border-radius: 8px;
`;

export const ButtonLargeTop = styled.View`
  width: 100%;
  height: 50%;
  flex-direction: row;
`;

export const ButtonLargeTopWrapper = styled.View`
  width: 50%;
  padding: 5px;
`;

export const ButtonLargeActivityDisplay = styled.View``;

export const ButtonLargeBottom = styled.View`
  width: 100%;
  height: 50%;
  justify-content: flex-end;
  align-items: flex-end;
`;

export const ButtonLargeDescription = styled.Text`
  color: black;
  text-align: right;
`;

export const ButtonLargeName = styled.Text`
  color: black;
  text-align: right;
  font-size: 28px;
  font-weight: bold;
`;

export const ButtonMediumContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  padding: 8px;
  background-color: #f8f8f8;
  border-width: 0.7px;
  border-color: #dfdfdf;
  width: 49%;
  height: 85px;
  border-radius: 8px;
  overflow: hidden;
`;

export const ButtonMediumLeft = styled.View`
  justify-content: flex-end;
  align-items: flex-start;
`;

export const ButtonMediumDescription = styled.Text`
  color: black;
  text-align: left;
  font-size: 11px;
`;

export const ButtonMediumName = styled.Text`
  color: black;
  text-align: left;
  font-size: 18px;
  font-weight: bold;
`;

export const ButtonMediumRight = styled.View`
  position: relative;
  width: 35%;
  bottom: -10px;
  right: -25px;
  overflow: visible;
`;

export const ButtonSmallContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  padding: 8px;
  background-color: #f8f8f8;
  border-width: 0.7px;
  border-color: #dfdfdf;
  width: 23.5%;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
`;

export const ButtonSmallTop = styled.View`
  justify-content: flex-end;
  align-items: flex-start;
`;

export const ButtonSmallName = styled.Text`
  color: black;
  text-align: right;
  font-size: 16px;
  font-weight: bold;
`;

export const ButtonSmallBottom = styled.View`
  position: relative;
  width: 40px;
  height: 38px;
  bottom: -10px;
  right: -40px;
  overflow: visible;
`;

export const GEMSECTION = styled.View``;

export const GEMButtonCover = styled.View`
  width: 100%;
  padding: 8px 15px;
`;

export const GEMButton = styled.TouchableOpacity`
  display: flex;
  background-color: white;
  height: 65px;
  border-radius: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const GEMButtonImageBox = styled.View`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

export const GEMButtonImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const GEMButtonText = styled.Text`
  color: black;
  font-size: 15px;
  letter-spacing: -0.25px;
`;

export const StampSection = styled.View`
  width: 100%;
  height: auto;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
  justify-content: center;
  flex-direction: row;
`;

export const StampText = styled.Text`
  color: #666;
`;

export const StampLogoContainer = styled.View`
  width: 25px;
  height: 27px;
  margin-left: 5px;
  padding: 3px;
`;

export const StampLogoImage = styled.Image`
  width: 100%;
  height: 100%;
`;
