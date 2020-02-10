import React, { Fragment } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Table } from "../common/Table";

export const CardTabs = ({ data }) => {
  return (
    <Fragment>
      <Tabs defaultActiveKey="menu" transition={false} id="noanim-tab-example">
        <Tab eventKey="menu" title="Menu">
          <div className="tabContent">{data.menu && <Table data={data} />}</div>
        </Tab>
        {data.review && (
          <Tab eventKey="review" title="Review">
            <div className="tabContent">{data.review && data.review}</div>
          </Tab>
        )}
      </Tabs>
    </Fragment>
  );
};
