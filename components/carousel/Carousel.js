import * as React from 'react';
import {
    View
} from 'react-native';
import RNCarousel from 'react-native-snap-carousel';
import appStyles from 'styles/AppStyles';
import appSizes from 'styles/AppSizes';

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
            <View style={{flex: 1, flexDirection:'row', justifyContent: 'center'}}>
                <RNCarousel
                    layout={"default"}
                    ref={ref => this.carousel = ref}
                    data={this.state.carouselItems}
                    sliderWidth={appSizes.carouselWidth()}
                    itemWidth={appSizes.carouselWidth()}
                    renderItem={this.renderItem}
                    onSnapToItem = {index => this.setState({activeIndex:index})} />
            </View>
        );
    }
}