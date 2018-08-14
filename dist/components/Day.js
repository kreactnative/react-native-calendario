
/* eslint-disable react/no-multi-comp */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    marginVertical: 5
  },
  activeDate: {
    backgroundColor: '#3b5998'
  },
  startDate: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100
  },
  endDate: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100
  }
});

class NonTouchableDay extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.isActive !== nextProps.isActive;
  }

  render() {
    const {
      isMonthDate,
      isActive,
      theme,
      date
    } = this.props;

    return <View style={[styles.container, theme.dayContainerStyle, theme.nonTouchableDayContainerStyle, isActive ? styles.activeDate : {}, isActive ? theme.activeDayContainerStyle : {}]}>
        <Text style={[{ color: '#d3d3d3' }, theme.nonTouchableDayTextStyle, !isMonthDate && theme.nonTouchableLastMonthDayTextStyle]}>
          {!isActive && date.getDate()}
        </Text>
      </View>;
  }
}

export default class Day extends React.Component {
  static defaultProps = {
    renderDayContent: null
  };

  shouldComponentUpdate(nextProps) {
    return this.props.item.isActive !== nextProps.item.isActive || this.props.item.isStartDate !== nextProps.item.isStartDate || this.props.item.isEndDate !== nextProps.item.isEndDate || this.props.renderDayContent !== nextProps.renderDayContent;
  }

  handlePress = () => this.props.onPress(this.props.item.date);

  render() {
    const {
      item: {
        date,
        isVisible,
        isActive,
        isStartDate,
        isEndDate,
        isMonthDate
      },
      theme
    } = this.props;

    if (!isVisible) {
      return <NonTouchableDay isActive={isActive} date={date} theme={theme} isMonthDate={isMonthDate} />;
    }

    return <TouchableOpacity style={[styles.container, theme.dayContainerStyle, isActive ? styles.activeDate : {}, isStartDate ? styles.startDate : {}, isEndDate ? styles.endDate : {}, isActive ? theme.activeDayContainerStyle : {}]} onPress={this.handlePress}>
        {this.props.renderDayContent ? this.props.renderDayContent(this.props.item) : <Text style={[{ color: isActive ? 'white' : 'black' }, theme.dayTextStyle, isActive ? theme.activeDayTextStyle : {}]}>
                {date.getDate()}
              </Text>}
      </TouchableOpacity>;
  }
}