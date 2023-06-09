import React from "react";
import renderer from "react-test-renderer";
import { CocktailPage } from "./CocktailPage";
import store from "../store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { noop } from "lodash";
import cocktails from "../data/cocktail.json";
import { loadDatabase } from "../util/db.utils";

beforeAll(async () => {
  await loadDatabase(store);
});

beforeAll(() => {
  window.scrollToMemo = window.scrollTo;
  window.scrollTo = noop;
});

afterAll(() => {
  window.scrollTo = window.scrollToMemo;
  delete window.scrollToMemo;
});

it("does not explode when rendered", async () => {
  const cocktail = store.getState().db.cocktails[0];

  const tree = renderer.create(
    <Provider store={store}>
      <MemoryRouter>
        <CocktailPage cocktail={cocktail} enrichCocktail={noop} />
      </MemoryRouter>
    </Provider>
  );

  expect(tree).toMatchSnapshot();
});
