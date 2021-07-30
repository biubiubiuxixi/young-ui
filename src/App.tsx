/*
 * @Descripttion: 
 * @Author: chelsea.jiang
 * @Date: 2021-05-27 19:27:20
 * @LastEditors: chelsea.jiang
 * @LastEditTime: 2021-05-28 22:35:34
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Button from "./components/Button/Button";
import Alert, {AlertType} from "./components/Alert/Alert";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
import SubMenu from "./components/Menu/SubMenu";
import Tabs from "./components/Tabs/Tabs";
import TabPane from "./components/Tabs/TabPane";
import Icon from "./components/Icon/icon";
import Transition from "./components/Transition/transition";
import {useState} from "react";

library.add(fas);

function App() {
    const [show, setShow] = useState(false);
  return (
    <div className="App">
      <Button onClick={() => setShow(!show)}>点击显示transition列表内容</Button>
      <Transition
        in={show}
        animation="zoom-in-left"
        timeout={300}
      >
        <div>
            <p>搭建一套属于自己的组件库!嘿嘿嘿呀呀呀呀</p>
            <p>搭建一套属于自己的组件库!嘿嘿嘿呀呀呀呀</p>
            <p>搭建一套属于自己的组件库!嘿嘿嘿呀呀呀呀</p>
            <p>搭建一套属于自己的组件库!嘿嘿嘿呀呀呀呀</p>
            <p>搭建一套属于自己的组件库!嘿嘿嘿呀呀呀呀</p>
            <p>搭建一套属于自己的组件库!嘿嘿嘿呀呀呀呀</p>
            <p>搭建一套属于自己的组件库!嘿嘿嘿呀呀呀呀</p>
            <p>搭建一套属于自己的组件库!嘿嘿嘿呀呀呀呀</p>
        </div>
      </Transition>
      <Transition
          in={show}
          animation="zoom-in-left"
          timeout={300}
          wrapper
      >
        <Button>嘿嘿嘿嘿 看我会有动画吗</Button>
      </Transition>
      <Icon icon="coffee" size="lg" theme="primary" />
      <Icon icon="coffee" size="lg" theme="danger" />
      <Button onClick={(e) => console.log(e)}>Default Button</Button>
      <Button buttonType="primary">Primary Button</Button>
      <Button buttonType="danger">Danger Button</Button>
      <Button buttonType="link" href="https://www.baidu.com">Link Button</Button>
      <Button buttonType="link" href="https://www.baidu.com" disabled>Link Disabled Button</Button>
      <Button size="sm" buttonType="primary">Small Primary Button</Button>
      <Button size="lg" buttonType="primary" disabled>Large Primary Disabled Button</Button>
      <Alert title="提示标题" content="这是内容哎哎哎哎哎哎！顶顶顶顶" closable={false} />
      <Alert type={AlertType.Success} content="这是内容哎哎哎哎哎哎！顶顶顶顶"  />
      <Alert type={AlertType.Danger} content="提示标题" />
      <Alert type={AlertType.Warning} title="提示标题" content="这是内容哎哎哎哎哎哎！顶顶顶顶" closeText={<span style={{ color: 'red' }}>关掉它</span>} />
      <Menu onSelect={(index) => console.log(index)}>
        <MenuItem>link 1</MenuItem>
        <MenuItem disabled>link 2</MenuItem>
        <MenuItem>link 3</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>link 1</MenuItem>
          <MenuItem disabled>link 2</MenuItem>
          <MenuItem>link 3</MenuItem>
        </SubMenu>
      </Menu>
      <Menu mode="vertical" onSelect={(index) => console.log(index)} defaultOpenSubMenus={["3"]}>
        <MenuItem>link 1</MenuItem>
        <MenuItem disabled>link 2</MenuItem>
        <MenuItem>link 3</MenuItem>
        <SubMenu title="submenu">
          <MenuItem>link 1</MenuItem>
          <MenuItem disabled>link 2</MenuItem>
          <MenuItem>link 3</MenuItem>
        </SubMenu>
      </Menu>
      <Tabs>
        <TabPane label="one">第1个</TabPane>
        <TabPane label="two">第2个</TabPane>
        <TabPane label="three" disabled>第3个</TabPane>
        <TabPane label="four">第4个</TabPane>
      </Tabs>
      <Tabs type="card">
        <TabPane label="one">第1个</TabPane>
        <TabPane label={<span>two</span>}>第2个</TabPane>
        <TabPane label="three" disabled>第3个</TabPane>
        <TabPane label="four">第4个</TabPane>
      </Tabs>
    </div>
  );
}

export default App;
