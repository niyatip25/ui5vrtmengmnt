import "@ui5/webcomponents-icons/dist/Assets";
import {
  Badge,
  Button,
  ButtonDesign,
  DynamicPage,
  DynamicPageTitle,
  FlexBox,
  FlexBoxDirection,
  Label,
  ShellBar,
  Table,
  TableCell,
  TableColumn,
  TableRow,
  ThemeProvider,
  VariantItem,
  VariantManagement,
} from "@ui5/webcomponents-react";
import React, { useEffect } from "react";
import { useState } from "react";

import "./App.css";

function App() {
  // const variantitems = ["default", "standard", "userdefined"];
  const [headerVariant, setHeaderVariant] = useState("Header Variant 1");
  const [navigationItems, setNavigationItems] = useState([
    <Button key={"decline"} icon="decline" design={ButtonDesign.Transparent} />,
  ]);
  const [actionItems, setActionItems] = useState([
    <Button key={"edit"} design={ButtonDesign.Emphasized}>
      Edit
    </Button>,
    <Button key={"delete"} design={ButtonDesign.Transparent}>
      Delete
    </Button>,
  ]);

  const selectVariant = (e) => {
    const selectedVariant = e.detail.selectedVariant.children;
    setHeaderVariant(selectedVariant);
    setNavigationItems(
      selectedVariant === "Header Variant 2"
        ? [
            <Button
              key={"fullscreen"}
              icon="full-scree
              "
              design={ButtonDesign.Transparent}
            />,
            <Button
              key={"exitFullscreen"}
              icon="exit-full-screen"
              design={ButtonDesign.Transparent}
            />,
            <Button
              key={"decline"}
              icon="decline"
              design={ButtonDesign.Transparent}
            />,
          ]
        : [
            <Button
              key={"decline"}
              icon="decline"
              design={ButtonDesign.Transparent}
            />,
          ]
    );
    setActionItems(
      selectedVariant === "Header Variant 1"
        ? [
            <Button key={"edit"} design={ButtonDesign.Emphasized}>
              Edit
            </Button>,
            <Button key={"delete"} design={ButtonDesign.Transparent}>
              Delete
            </Button>,
          ]
        : [
            <Button key={"copy"} design={ButtonDesign.Transparent}>
              Copy
            </Button>,
            <Button
              key={"action"}
              icon="action"
              design={ButtonDesign.Transparent}
            />,
          ]
    );
  };

  const [variantitems, setvariantitems] = useState([]);
  const onSaveVariantItem = (e) => {
    console.log("e: ", e);
    // setvariantitems((variantitems) => [...variantitems, e.detail.children]);
  };

  useEffect(() => {
    fetch(
      "http://oneupstream-dev.tecnicslabs.com/api/v1/variants/?screen_name=property"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        setvariantitems(data);
      });
  }, [setvariantitems]);

  return (
    <ThemeProvider>
      <ShellBar primaryTitle="UI5 Web Components for React Template" />
      <FlexBox
        style={{ width: "100%", height: "100vh" }}
        direction={FlexBoxDirection.Column}
        // justifyContent={FlexBoxJustifyContent.Center}
        // alignItems={FlexBoxAlignItems.Center}
      >
        <DynamicPage
          headerTitle={
            <DynamicPageTitle
              actions={actionItems}
              navigationActions={navigationItems}
              header={
                <VariantManagement onSelect={selectVariant}>
                  <VariantItem selected={headerVariant === "Header Variant 1"}>
                    Header Variant 1
                  </VariantItem>
                  <VariantItem selected={headerVariant === "Header Variant 2"}>
                    Header Variant 2
                  </VariantItem>
                </VariantManagement>
              }
              subHeader={<Label>This is a sub header</Label>}
            >
              <Badge>Status: OK</Badge>
            </DynamicPageTitle>
          }
        >
          <>
            <VariantManagement
              onSaveAs={(e) => onSaveVariantItem(e)}
              onSaveManageViews={(e) => onSaveVariantItem(e)}
            >
              {variantitems.map((item, index) => {
                return (
                  <VariantItem
                    // type="Detail"
                    tooltip="asasdasd"
                    selected="false"
                    labelReadOnly="true"
                    readOnly="true"
                    hideDelete="true"
                    favorite="true"
                    icon="add"
                    image="https://www.sapbrandtools.com/imagelibrary/images/top-region__logo.png"
                    iconEnd={true}
                    author="SAP" // {item.createdBy}
                    isDefault={item.default}
                    global={item.public}
                    key={index}
                  >
                    {item.name}
                  </VariantItem>
                );
              })}
              {/* <VariantItem>Default VariantItem</VariantItem>
              <VariantItem selected>Selected</VariantItem>
              <VariantItem author="SAP">Author</VariantItem>
              <VariantItem favorite>Favorite</VariantItem>
              <VariantItem isDefault>IsDefault</VariantItem>
              <VariantItem favorite labelReadOnly>
                Favorite & labelReadOnly
              </VariantItem>
              <VariantItem applyAutomatically>ApplyAutomatically</VariantItem>
              <VariantItem readOnly>ReadOnly</VariantItem>
              <VariantItem global>Global</VariantItem>
              <VariantItem global readOnly>
                Global & readOnly
              </VariantItem>
              <VariantItem global>{`Not deletable -> global`}</VariantItem>
              <VariantItem
                hideDelete
              >{`Not deletable -> hideDelete`}</VariantItem>
              <VariantItem hideDelete={false} global>
                {`Deletable -> hideDelete: false, global: true`}
              </VariantItem> */}
            </VariantManagement>

            <Table
              columns={
                <>
                  <TableColumn
                    style={{
                      width: "12rem",
                    }}
                  >
                    <Label>Product</Label>
                  </TableColumn>
                  <TableColumn minWidth={800} popinText="Supplier">
                    <Label>Supplier</Label>
                  </TableColumn>
                  <TableColumn
                    minWidth={600}
                    popinText="Dimensions"
                    demandPopin
                  >
                    <Label>Dimensions</Label>
                  </TableColumn>
                  <TableColumn minWidth={600} popinText="Weight" demandPopin>
                    <Label>Weight</Label>
                  </TableColumn>
                  <TableColumn>
                    <Label>Price</Label>
                  </TableColumn>
                </>
              }
            >
              <TableRow>
                <TableCell>
                  <Label>Notebook Basic</Label>
                </TableCell>
                <TableCell>
                  <Label>Very Best Screens</Label>
                </TableCell>
                <TableCell>
                  <Label>30 x 18 x 3cm</Label>
                </TableCell>
                <TableCell>
                  <Label>4.2KG</Label>
                </TableCell>
                <TableCell>
                  <Label>956EUR</Label>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Label>Notebook Basic 17HT-1001</Label>
                </TableCell>
                <TableCell>
                  <Label>Very Best Screens</Label>
                </TableCell>
                <TableCell>
                  <Label>29 x 17 x 3.1cm</Label>
                </TableCell>
                <TableCell>
                  <Label>4.5KG</Label>
                </TableCell>
                <TableCell>
                  <Label>1249EUR</Label>
                </TableCell>
              </TableRow>
            </Table>
          </>
        </DynamicPage>
      </FlexBox>
    </ThemeProvider>
  );
}

export default App;
