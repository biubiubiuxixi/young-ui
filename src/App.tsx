/*
 * @Descripttion: 
 * @Author: chelsea.jiang
 * @Date: 2021-05-27 19:27:20
 * @LastEditors: chelsea.jiang
 * @LastEditTime: 2021-05-28 22:35:34
 */
import Button, {ButtonSize, ButtonType} from "./components/Button/Button";
import Alert, {AlertType} from "./components/Alert/Alert";
import Menu from "./components/Menu/Menu";
import MenuItem from "./components/Menu/MenuItem";
import SubMenu from "./components/Menu/SubMenu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={(e) => console.log(e)}>Default Button</Button>
        <Button buttonType={ButtonType.Primary}>Primary Button</Button>
        <Button buttonType={ButtonType.Danger}>Danger Button</Button>
        <Button buttonType={ButtonType.Link} href="https://www.baidu.com">Link Button</Button>
        <Button buttonType={ButtonType.Link} href="https://www.baidu.com" disabled>Link Disabled Button</Button>
        <Button size={ButtonSize.Small} buttonType={ButtonType.Primary}>Small Primary Button</Button>
        <Button size={ButtonSize.Large} buttonType={ButtonType.Primary} disabled>Large Primary Disabled Button</Button>
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
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
