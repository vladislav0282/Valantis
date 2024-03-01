import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { Pagination } from "react-bootstrap";
import { Context } from "../index";

const Pages = observer(() => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  const clicKPageHandler = (page: any) => {
    device.setPage(page);
    let offsetNew = (page - 1) * device.limit;
    device.setOffset(offsetNew);
  };

  return (
    <Pagination className="mt-3">
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={device.page === page}
          onClick={() => clicKPageHandler(page)}
        >
          {page}
        </Pagination.Item>
      ))}
    </Pagination>
  );
});

export default Pages;
