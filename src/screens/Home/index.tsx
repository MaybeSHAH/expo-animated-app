import { Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { FlatList, Platform } from 'react-native'
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import VItem from './components/VItem';

import * as S from './styles';
import { hItems, vItems } from './utils';

export default function Home() {
    const contentRotateY = useSharedValue(0);
    const contentTranslateX = useSharedValue(0);
    const contentScale = useSharedValue(1);

    const [openMenu, setOpenMenu] = useState(false);
    const [openOnboardModal, setOpenOnboardModal] = useState(false);
    const [openSignModal, setOpenSignModal] = useState(false);

    useEffect(() => {
        const options = { damping: 14 };
        const translateX = Platform.OS === "ios" ? 265 : 220;

        contentRotateY.value = withSpring(openMenu ? -30 : 0, options);
        contentTranslateX.value = withSpring(openMenu ? translateX : 0, options);
        contentScale.value = withSpring(openMenu ? 0.9 : 1, options);
        contentScale.value = withSpring(openOnboardModal ? 0.92 : 1, options);
    }, [openMenu, openOnboardModal]);

    const animatedContentStyle = useAnimatedStyle(() => ({
        transform: [
            {translateX: 207},
            {perspective: 400},
            {rotateY: `${contentRotateY.value}deg`},
            {translateX: -207},
            {translateX: contentTranslateX.value},
            {scale: contentScale.value},
        ]
    }));
  return (
    <S.Container>
        <S.Content style={[animatedContentStyle]} >
            <S.ScrollView>
                <S.Title>Courses</S.Title>
                <FlatList
                    data={vItems}
                    keyExtractor={item => item.title}
                    renderItem={({item}) => <VItem item={item} /> }
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ marginTop: 18, paddingRight: 24 }}
                    />
                <S.SubTitle>Recents</S.SubTitle>
                <S.Empty />
            </S.ScrollView>
        </S.Content>
      <Text>Home Page</Text>
    </S.Container>
  )
}