/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Switch,
  Button,
  FlatList,
  Image,
  DimensionValue,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {images} from './utils/images';

function getDayOfWeek(date: Date): string {
  const days = [
    '星期日',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ];
  return days[date.getDay()];
}

type BtnItem = {week: 1 | 2 | 3 | 4 | 5 | 6 | 7; text: string};
const weekdays: Array<BtnItem> = [
  {week: 7, text: '周日'},
  {week: 1, text: '周一'},
  {week: 2, text: '周二'},
  {week: 3, text: '周三'},
  {week: 4, text: '周四'},
  {week: 5, text: '周五'},
  {week: 6, text: '周六'},
];
import data from './data/json/calendar.json';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const safePadding = '5%';

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${String(
    date.getMonth() + 1,
  ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const dayOfWeek = getDayOfWeek(date);
  const dayNow = date.getDay();

  const [btnNow, setBtnNow] = useState<number>(dayNow); // 当前选中的按钮

  const switchDay = (day: number) => {
    setBtnNow(day); // 更新当前选中的按钮
  };

  const filteredData = data.filter(item => item.dropDays.includes(btnNow));

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <FlatList
        ListHeaderComponent={
          <CustomComponent
            isDarkMode={isDarkMode}
            isEnabled={isEnabled}
            toggleSwitch={toggleSwitch}
            formattedDate={formattedDate}
            dayOfWeek={dayOfWeek}
            weekdays1={weekdays}
            btnNow={btnNow}
            switchDay={switchDay}
            safePadding={safePadding}
            Colors1={Colors}
          />
        }
        data={filteredData}
        numColumns={3}
        keyExtractor={item => item.id.toString()}
        initialNumToRender={15}
        renderItem={({item}) => (
          <Image
            source={images[item.star.toString() as keyof typeof images]}
            style={styles.image}
          />
        )}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{marginBottom: 30}}
      />
    </View>
  );
}
interface CustomComponentProps {
  isDarkMode: boolean; // 是否是暗色模式
  isEnabled: boolean; // 是否启用
  toggleSwitch: () => void; // 切换开关的回调函数
  formattedDate: string; // 格式化的日期
  dayOfWeek: string; // 当前星期
  weekdays1:Array<BtnItem>; // 星期数组
  btnNow: number; // 当前选中的星期编号
  switchDay: (week: number) => void; // 切换星期的回调函数
  safePadding: DimensionValue; // 安全区域的内边距
  Colors1: any; // 颜色主题
}

const CustomComponent :React.FC<CustomComponentProps>  = ({
  isDarkMode,
  isEnabled,
  toggleSwitch,
  formattedDate,
  dayOfWeek,
  weekdays1,
  btnNow,
  switchDay,
  safePadding,
  Colors1,
}) => {
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? Colors1.black : Colors1.white,
        paddingHorizontal: safePadding,
        paddingBottom: safePadding,
      }}>
      <View style={styles.container}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text>{isEnabled ? '角色' : '武器'}</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.itemText}>今日素材</Text>
        <Text style={styles.itemText}>{formattedDate}</Text>
        <Text style={styles.itemText}>{dayOfWeek}</Text>
      </View>

      <View style={styles.container2}>
        {weekdays1.map((weekday, index) => (
          <View key={index} style={styles.buttonWrapper}>
            <Button
              title={weekday.text}
              color={weekday.week === btnNow ? '#ffcd0c' : '#393b40'}
              onPress={() => switchDay(weekday.week)}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  container3: {
    flex: 1,
    flexDirection: 'row', // 设置主轴方向为水平
    flexWrap: 'wrap', // 允许子元素换行
    justifyContent: 'space-between', // 每行的子元素之间间距均匀分布
  },
  buttonWrapper: {
    margin: 5, // 添加按钮之间的间距
  },
  itemText:{
    marginRight: 5,
  },
});

export default App;
