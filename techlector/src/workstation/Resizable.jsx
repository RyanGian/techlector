import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./Resizable.css";
import React, { useState } from "react";
import Bottom from "./bottom.svg?react";
import Left from "./left.svg?react";
import Right from "./right.svg?react";
import Top from "./top.svg?react";
import { Button } from "@mantine/core";
import ItemMenu from "./ItemMenu.jsx";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";

export default function Resizable() {
  return (
    <div className="panel-container">
      <PanelGroup autoSaveId="horizontal" direction="horizontal">
        <Panel
          className="panel-left"
          defaultSize={30}
          minSize={20}
          maxSize={50}
        >
          <div className="collapsible-navbar">
            <TbLayoutSidebarLeftCollapseFilled className="left-collapse-button" />
          </div>
        </Panel>
        <PanelResizeHandle className="vertical-resize-bar">
          <div className="vertical-bar"></div>
        </PanelResizeHandle>
        <Panel className="panel-right" defaultSize={30} minSize={20}>
          right
        </Panel>
      </PanelGroup>
    </div>
  );
}

{
  /* <PanelGroup autoSaveId="horizontal" direction="horizontal">
        <Panel minSize={25} defaultSize={35} maxSize={35}>
          <div className="panel-left">
            <ItemMenu />
          </div>
        </Panel>
        <PanelResizeHandle className="resize-width-handler">
          <div className="with-handle-width">
            <Left className="left-arrow" />
            <Right className="right-arrow" />
          </div>
        </PanelResizeHandle>
        <Panel defaultSize={70}>
          <div className="panel-right"></div>
        </Panel> */
  /*
        <Panel maxSize={10}>
          <PanelGroup autoSaveId="vertical" direction="vertical">
            <Panel maxSize={90}>
              <div className="panel-left"></div>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="resize-width-handler">
          <div className="with-handle-width">
            <Left className="left-arrow" />
            <Right className="right-arrow" />
          </div>
        </PanelResizeHandle>

        <Panel maxSize={80}>
          <div className="panel-right"></div>
        </Panel> */
}
{
  /* </PanelGroup> */
}
