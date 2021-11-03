import * as React from 'react';
import {
    View
} from 'react-native';
import RNCarousel from 'react-native-snap-carousel';
import Circle from 'components/circle/Circle';
import appStyles from 'styles/AppStyles';
import appSizes from 'styles/AppSizes';
import appColors from 'styles/AppColors';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: props.children
        }
    }

    renderItem({item, index}){
        return (
            <View style={[appStyles.vertical, appStyles.alignItemsCenter]}>
                {item}
            </View>
        )
    }

    render() {
        return (
            <View style={[appStyles.vertical, appStyles.justifyCenter, appStyles.alignItemsCenter]}>
                <RNCarousel
                    layout={"default"}
                    ref={ref => this.carousel = ref}
                    data={this.state.carouselItems}
                    sliderWidth={appSizes.carouselWidth()}
                    itemWidth={appSizes.carouselWidth()}
                    renderItem={this.renderItem}
                    onSnapToItem = {index => this.setState({activeIndex:index})} />

                <View style = {[appStyles.horizontal, appStyles.justifyCenter]}>
                {this.state.carouselItems.map((item, index) => {
                    const color = index === this.state.activeIndex ? appColors.color3 : appColors.color5;
                    return (
                        <Circle diameter={10} color={color} margin={5}/>
                    )
                })}
                </View>
            </View>
        );
    }
}