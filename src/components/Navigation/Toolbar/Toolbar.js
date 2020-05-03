import React from "react";

import {
  ChevronDown,
  Delete,
  Overflow as UserIcon,
  Upload as Icon
} from "baseui/icon";
import { Layer } from "baseui/layer";
import { useStyletron } from "baseui";
import { Unstable_AppNavBar as AppNavBar } from "baseui/app-nav-bar";

import Logo from "../../Logo/Logo";

function renderItem(item) {
  return item.label;
}

const MAIN_NAV = [
  {
    active: true,
    icon: Icon,
    item: { label: "Burger Builder" },
    mapItemToNode: renderItem,
    mapItemToString: renderItem
  },
  {
    icon: Icon,
    item: { label: "Checkout" },
    mapItemToNode: renderItem,
    mapItemToString: renderItem
  },
  {
    icon: ChevronDown,
    item: { label: "Primary alpha3" },
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
    navExitIcon: Delete,
    nav: [
      {
        icon: Icon,
        item: { label: "Secondary menu1" },
        mapItemToNode: renderItem,
        mapItemToString: renderItem
      },
      {
        icon: Icon,
        item: { label: "Secondary menu2" },
        mapItemToNode: renderItem,
        mapItemToString: renderItem
      }
    ]
  },
  {
    icon: ChevronDown,
    item: { label: "Primary alpha4" },
    mapItemToNode: renderItem,
    mapItemToString: renderItem,
    navExitIcon: Delete,
    nav: [
      {
        icon: ChevronDown,
        item: { label: "Secondary menu1" },
        mapItemToNode: renderItem,
        mapItemToString: renderItem,
        nav: [
          {
            icon: Icon,
            item: { label: "Tertiary menu1" },
            mapItemToNode: renderItem,
            mapItemToString: renderItem
          },
          {
            icon: Icon,
            item: { label: "Tertiary menu2" },
            mapItemToNode: renderItem,
            mapItemToString: renderItem
          }
        ]
      },
      {
        icon: Icon,
        item: { label: "Secondary menu2" },
        mapItemToNode: renderItem,
        mapItemToString: renderItem
      }
    ]
  }
];
const USER_NAV = [
  {
    icon: UserIcon,
    item: { label: "Account item1" },
    mapItemToNode: renderItem,
    mapItemToString: renderItem
  },
  {
    icon: UserIcon,
    item: { label: "Account item2" },
    mapItemToNode: renderItem,
    mapItemToString: renderItem
  },
  {
    icon: UserIcon,
    item: { label: "Account item3" },
    mapItemToNode: renderItem,
    mapItemToString: renderItem
  },
  {
    icon: UserIcon,
    item: { label: "Account item4" },
    mapItemToNode: renderItem,
    mapItemToString: renderItem
  }
];

const Toolbar = props => {
  const [css] = useStyletron();

  const containerStyles = css({
    boxSizing: "border-box",
    width: "100vw",
    position: "fixed",
    top: "0",
    left: "0"
  });

  return (
    <Layer>
      <div className={containerStyles}>
        <AppNavBar
          appDisplayName={<Logo />}
          mainNav={MAIN_NAV}
          onNavItemSelect={({ item }) => {
            console.log(item);
          }}
          userNav={USER_NAV}
          username="Yida Wang"
          usernameSubtitle="5.0"
          userImgUrl=""
        />
      </div>
    </Layer>
  );
};

export default Toolbar;
