import React, { Fragment } from "react";
import { Input } from "../common/Input";

export const Form = ({ card, onChange, columns, disable }) => {
  const { name, zomato, menu } = card;

  return (
    <Fragment>
      <Input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        label="Name:"
        required={true}
        columns={columns}
        disable={disable || false}
      />

      <Input
        type="text"
        name="zomato"
        value={zomato}
        onChange={onChange}
        label="Zomato:"
        columns={columns}
        disable={disable || false}
      />
      <Input
        type="text"
        name="menu"
        value={menu}
        onChange={onChange}
        label="Menu:"
        required={true}
        helperText={`Write menu like this: "DISH-PRICE, DISH-PRICE..."`}
        columns={columns}
      />
    </Fragment>
  );
};
