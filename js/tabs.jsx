import { useState, useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

function Tab({ title, path, id, onClose }) {
  function closeTab() {
    onClose(id);
  }

  return (
    <div key={id} is-="badge" className={path === window.location.pathname ? "selected tab" : "tab"}>
      <a href={path}>
        {title}
      </a>
      <span onClick={closeTab}>x</span>
    </div>
  );
}

function TabsComponent() {
  const [cookies, setCookie] = useCookies(['tabs']);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    console.log("called")
    let savedTabs = cookies.tabs ? cookies.tabs : [];

    let tab = {
      title: document.title,
      path: window.location.pathname,
      id: Date.now()
    };

    if (!savedTabs.some(t => t.title === tab.title)) {
      savedTabs.push(tab);
      setCookie('tabs', savedTabs, { path: '/' });
    }

    setTabs(savedTabs);
  }, []);

  const closeTab = (id) => {
    const updatedTabs = tabs.filter(t => t.id !== id);
    setTabs(updatedTabs);
    setCookie('tabs', updatedTabs, { path: '/' });
    if (!updatedTabs.some(t => t.title === document.title)) document.location = '/'
  };

  return (
    <>
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          title={tab.title}
          path={tab.path}
          id={tab.id}
          onClose={closeTab}
        />
      ))}
    </>
  );
}

export default function Tabs() {
  return (
    <CookiesProvider>
      <SimpleBar forceVisible="x">
        <TabsComponent />
      </SimpleBar >
    </CookiesProvider >
  )
}
