import { useState, useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

function Tab(title, path, id) {
  return (
    <span key={id} is-="badge" cap-="round">
      <a href={path}>{title}</a>
    </span>
  );
}

function TabsComponent() {
  const [cookies, setCookie] = useCookies(['tabs']);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    let tab = { title: document.title, path: window.location.pathname, id: 0 };
    const existingTabs = cookies.tabs || [];

    if (!existingTabs.some(t => t.path === new URL(document.location.href).pathname)) {
      tab.id = existingTabs.length > 0 ? existingTabs[existingTabs.length - 1].id + 1 : 0;
      const updatedTabs = [...existingTabs, tab];
      setTabs(updatedTabs);
      setCookie('tabs', updatedTabs);
    } else {
      setTabs(existingTabs);
    }
  }, []);

  const tabList = tabs.map(tab => Tab(tab.title, tab.path, tab.id));

  return (
    <>
      {tabList}
    </>
  );
}

export default function Tabs() {
  return (
    <CookiesProvider>
      <TabsComponent />
    </CookiesProvider>
  );
}
