"use client";
import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  // Layout & shell
  Content,
  Header,
  HeaderGlobalBar,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  Heading,
  Layer,
  Section,
  Stack,

  // Navigation
  Breadcrumb,
  BreadcrumbItem,

  // Disclosure
  Accordion,
  AccordionItem,

  // Actions
  Button,
  Tag,

  // Forms: inputs & selectors
  TextInput,
  NumberInput,
  RadioButton,
  RadioButtonGroup,
  Checkbox,
  Toggle,
  Dropdown,
  ComboBox,
  MultiSelect,
  Select,
  SelectItem,
  DatePicker,
  DatePickerInput,
  FileUploader,
  Slider,
  Search,

  // Lists
  OrderedList,
  UnorderedList,
  ListItem,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,

  // Data display
  CodeSnippet,
  Tile,

  // Tables
  DataTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,

  // Feedback
  InlineNotification,
  Modal,
  Loading,
  InlineLoading,

  // Progress
  ProgressIndicator,
  ProgressStep,

  // Pagination
  Pagination,

  // Overlays
  Tooltip,
  DefinitionTooltip,
  ContentSwitcher,
  Switch,
} from "@carbon/react";
import { HeaderThemeSwitcher } from "@/components/ui/theme-switcher";

/* ---------- Small demo components (for things that need state) ---------- */

const DropdownDemo: React.FC = () => {
  const items = ["Option A", "Option B", "Option C"];
  const [selected, setSelected] = useState<string | null>(items[0]);

  return (
    <Dropdown
      id="dropdown-demo"
      titleText="Choose an option"
      label="Select"
      items={items}
      selectedItem={selected}
      onChange={({ selectedItem }) => setSelected(selectedItem as string)}
      itemToString={(item) => (item ? String(item) : "")}
    />
  );
};

const ComboBoxDemo: React.FC = () => {
  const items = useMemo(
    () => [
      "ibm.com",
      "ibm.org",
      "ibm-zcouncil.com",
      "developer.ibm.com",
      "cloud.ibm.com",
    ],
    []
  );
  const [value, setValue] = useState<string | null>(items[0]);
  return (
    <ComboBox
      id="combobox-demo"
      titleText="Choose a domain"
      helperText="Typeahead supported"
      items={items}
      selectedItem={value}
      itemToString={(i) => (i ? String(i) : "")}
      onChange={({ selectedItem }) => setValue(selectedItem as string)}
      shouldFilterItem={({ item, inputValue }) =>
        String(item).toLowerCase().includes(String(inputValue).toLowerCase())
      }
    />
  );
};

const MultiSelectDemo: React.FC = () => {
  const items = ["Red", "Green", "Blue", "Yellow", "Magenta", "Cyan"];
  const [selected, setSelected] = useState<string[]>(["Red", "Blue"]);
  return (
    <MultiSelect
      label="multiselect-demo"
      id="multiselect-demo"
      titleText="Favorite colors"
      helperText="Pick multiple"
      items={items}
      initialSelectedItems={selected}
      itemToString={(i) => (i ? String(i) : "")}
      onChange={({ selectedItems }) => setSelected(selectedItems as string[])}
    />
  );
};

const SelectDemo: React.FC = () => (
  <Select id="select-demo" labelText="Region">
    <SelectItem text="Select a region" value="" />
    <SelectItem text="US East" value="us-east" />
    <SelectItem text="US South" value="us-south" />
    <SelectItem text="EU Germany" value="eu-de" />
  </Select>
);

const DatePickerDemo: React.FC = () => (
  <DatePicker datePickerType="single">
    <DatePickerInput
      id="date-input"
      placeholder="mm/dd/yyyy"
      labelText="Pick a date"
    />
  </DatePicker>
);

const FileUploaderDemo: React.FC = () => (
  <FileUploader
    id="fileuploader-demo"
    filenameStatus="edit"
    labelTitle="Upload files"
    labelDescription="Max file size is 500 MB. Only .jpg files are supported."
    buttonLabel="Add file"
  />
);

const SliderDemo: React.FC = () => {
  const [v, setV] = useState(50);
  return (
    <Slider
      id="slider-demo"
      labelText={`Volume: ${v}`}
      min={0}
      max={100}
      step={1}
      value={v}
      onChange={({ value }) => setV(value as number)}
    />
  );
};

const SearchDemo: React.FC = () => {
  const [q, setQ] = useState("");
  return (
    <Search
      id="search-demo"
      labelText="Search"
      placeholder="Search..."
      value={q}
      onChange={(e) => setQ(e.currentTarget.value)}
    />
  );
};

const PaginationDemo: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  return (
    <Pagination
      id="pagination-demo"
      page={page}
      pageSize={pageSize}
      pageSizes={[10, 20, 30, 40, 50]}
      totalItems={103}
      onChange={({ page, pageSize }) => {
        setPage(page);
        setPageSize(pageSize);
      }}
    />
  );
};

const ProgressIndicatorDemo: React.FC = () => (
  <ProgressIndicator currentIndex={1}>
    <ProgressStep label="First step" />
    <ProgressStep label="Second step" />
    <ProgressStep label="Third step" />
    <ProgressStep label="Fourth step" />
  </ProgressIndicator>
);

const StructuredListDemo: React.FC = () => (
  <StructuredListWrapper>
    <StructuredListHead>
      <StructuredListRow head>
        <StructuredListCell head>Resource</StructuredListCell>
        <StructuredListCell head>Type</StructuredListCell>
        <StructuredListCell head>Status</StructuredListCell>
      </StructuredListRow>
    </StructuredListHead>
    <StructuredListBody>
      <StructuredListRow>
        <StructuredListCell>Load Balancer 1</StructuredListCell>
        <StructuredListCell>HTTP</StructuredListCell>
        <StructuredListCell>Active</StructuredListCell>
      </StructuredListRow>
      <StructuredListRow>
        <StructuredListCell>Load Balancer 2</StructuredListCell>
        <StructuredListCell>DNS</StructuredListCell>
        <StructuredListCell>Starting</StructuredListCell>
      </StructuredListRow>
    </StructuredListBody>
  </StructuredListWrapper>
);

const ListsDemo: React.FC = () => (
  <Stack gap={4}>
    <Heading>Lists</Heading>
    <UnorderedList>
      <ListItem>Alpha</ListItem>
      <ListItem>Beta</ListItem>
      <ListItem>Gamma</ListItem>
    </UnorderedList>
    <OrderedList>
      <ListItem>Step one</ListItem>
      <ListItem>Step two</ListItem>
      <ListItem>Step three</ListItem>
    </OrderedList>
  </Stack>
);

const TooltipDemo: React.FC = () => (
  <Stack gap={3}>
    <Tooltip label="Primary action tooltip">
      <Button>Hover me</Button>
    </Tooltip>
    <DefinitionTooltip definition="A concise definition shown on focus/hover.">
      <span>DefinitionTooltip term</span>
    </DefinitionTooltip>
  </Stack>
);

const ModalDemo: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        modalHeading="Example modal"
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        onRequestClose={() => setOpen(false)}
        onRequestSubmit={() => setOpen(false)}
      >
        <p>
          This is a simple transactional modal. Use it for confirm flows or
          short forms.
        </p>
      </Modal>
    </>
  );
};

const FormDemo: React.FC = () => {
  return (
    <Stack gap={4}>
      <TextInput
        id="textinput-demo"
        labelText="Name"
        placeholder="Ada Lovelace"
        helperText="Enter your full name"
      />
      <NumberInput
        id="numberinput-demo"
        label="Quantity"
        min={0}
        max={10}
        step={1}
        defaultValue={1}
      />
      <RadioButtonGroup
        name="plan"
        legendText="Plan"
        defaultSelected="pro"
        orientation="vertical"
      >
        <RadioButton id="plan-basic" labelText="Basic" value="basic" />
        <RadioButton id="plan-pro" labelText="Pro" value="pro" />
        <RadioButton id="plan-enterprise" labelText="Enterprise" value="ent" />
      </RadioButtonGroup>
      <Checkbox id="terms-check" labelText="I agree to the terms" />
      <Toggle
        id="toggle-demo"
        labelText="Email alerts"
        labelA="Off"
        labelB="On"
        defaultToggled
      />
    </Stack>
  );
};

const NotificationDemo: React.FC = () => (
  <Stack gap={3}>
    <InlineNotification
      kind="success"
      title="Saved"
      subtitle="Your changes have been saved."
      lowContrast
    />
    <InlineNotification
      kind="warning"
      title="Heads up"
      subtitle="Check your form for missing fields."
      lowContrast
    />
  </Stack>
);

const LoadingDemo: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <Stack gap={3}>
      <Button onClick={() => setShow((s) => !s)}>Toggle loading states</Button>
      {show ? (
        <>
          <Loading withOverlay description="Loading..." />
          <InlineLoading description="Saving changes..." />
        </>
      ) : (
        <p>Not loading.</p>
      )}
    </Stack>
  );
};

const ContentSwitcherDemo: React.FC = () => {
  const [selected, setSelected] = useState("one");
  return (
    <Stack gap={3}>
      <p className="text-label-01">Content Switcher</p>
      <ContentSwitcher
        selectedIndex={selected === "one" ? 0 : 1}
        onChange={({ index }) => setSelected(index === 0 ? "one" : "two")}
        size="md"
      >
        <Switch name="one" text="First" />

        <Switch name="two" text="Second" />
      </ContentSwitcher>
      <Tile>{selected === "one" ? "Tab One" : "Tab Two"} content</Tile>
    </Stack>
  );
};

const SnippetAndTileDemo: React.FC = () => (
  <Stack gap={4}>
    <CodeSnippet type="single">npm i @carbon/react</CodeSnippet>
    <Tile>
      <p>This is a simple Tile. Use for lightweight groupings of content.</p>
    </Tile>
    <Stack orientation="horizontal" gap={2}>
      <Tag type="blue">Beta</Tag>
      <Tag type="green">Active</Tag>
      <Tag type="magenta">Experimental</Tag>
    </Stack>
  </Stack>
);

/* ---------------------- DataTable (basic pattern) ---------------------- */

type Row = {
  id: string;
  name: string;
  protocol: string;
  port: number;
  rule: string;
};

const headers = [
  { key: "name", header: "Name" },
  { key: "protocol", header: "Protocol" },
  { key: "port", header: "Port" },
  { key: "rule", header: "Rule" },
];

const initialRows: Row[] = [
  {
    id: "a",
    name: "Load Balancer 1",
    protocol: "HTTP",
    port: 443,
    rule: "Round robin",
  },
  {
    id: "b",
    name: "Load Balancer 2",
    protocol: "HTTP",
    port: 80,
    rule: "DNS delegation",
  },
  {
    id: "c",
    name: "Load Balancer 3",
    protocol: "HTTP",
    port: 3000,
    rule: "Round robin",
  },
];

const DataTableDemo: React.FC = () => (
  <DataTable rows={initialRows} headers={headers}>
    {({
      rows,
      headers,
      getTableProps,
      getHeaderProps,
      getRowProps,
      getTableContainerProps,
    }) => (
      <TableContainer title="DataTable (basic)" {...getTableContainerProps()}>
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableHeader {...getHeaderProps({ header })} key={header.key}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow {...getRowProps({ row })} key={row.id}>
                {row.cells.map((cell) => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  </DataTable>
);

/* --------------------------- Component showcase -------------------------- */

const components = [
  { name: "Button", demo: () => <Button>Hello</Button> },

  {
    name: "Accordion",
    demo: () => (
      <Accordion align="start">
        <AccordionItem title="Data Structures">
          <p>
            Data structures are specialized formats for organizing data, like
            arrays, lists, stacks, queues, trees, and graphs.
          </p>
        </AccordionItem>
        <AccordionItem title="Algorithms">
          <p>
            Algorithms are step-by-step procedures for solving problems—sorting,
            searching, graph traversal, DP, and more.
          </p>
        </AccordionItem>
        <AccordionItem title="Time Complexity">
          <p>Big-O describes runtime growth vs. input size.</p>
        </AccordionItem>
      </Accordion>
    ),
  },
  { name: "Modal", demo: () => <ModalDemo /> },
  { name: "Dropdown", demo: () => <DropdownDemo /> },
  { name: "ComboBox", demo: () => <ComboBoxDemo /> },
  { name: "MultiSelect", demo: () => <MultiSelectDemo /> },
  { name: "Select", demo: () => <SelectDemo /> },
  { name: "DatePicker", demo: () => <DatePickerDemo /> },
  { name: "FileUploader", demo: () => <FileUploaderDemo /> },
  { name: "Slider", demo: () => <SliderDemo /> },
  { name: "Search", demo: () => <SearchDemo /> },

  { name: "Form inputs", demo: () => <FormDemo /> },
  { name: "Content Switcher", demo: () => <ContentSwitcherDemo /> },

  { name: "Notifications", demo: () => <NotificationDemo /> },
  { name: "Loading & InlineLoading", demo: () => <LoadingDemo /> },

  { name: "Tags, Tile & Snippet", demo: () => <SnippetAndTileDemo /> },

  {
    name: "Breadcrumb",
    demo: () => (
      <Breadcrumb noTrailingSlash>
        <BreadcrumbItem href="#">Home</BreadcrumbItem>
        <BreadcrumbItem href="#">Library</BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>Components</BreadcrumbItem>
      </Breadcrumb>
    ),
  },

  { name: "Tooltip & DefinitionTooltip", demo: () => <TooltipDemo /> },

  { name: "ProgressIndicator", demo: () => <ProgressIndicatorDemo /> },

  { name: "StructuredList", demo: () => <StructuredListDemo /> },

  { name: "Ordered & Unordered List", demo: () => <ListsDemo /> },

  { name: "DataTable (basic)", demo: () => <DataTableDemo /> },

  { name: "Pagination", demo: () => <PaginationDemo /> },
] as const;

export default function Home() {
  return (
    <>
      <Header>
        <HeaderName as={Link} href="/" prefix="Carbon">
          Boilerplate
        </HeaderName>
        <HeaderNavigation>
          <HeaderMenuItem as={Link} href="/">
            Home
          </HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderThemeSwitcher />
        </HeaderGlobalBar>
      </Header>

      <Content>
        <Stack gap={10}>
          <Section>
            <Stack gap={5}>
              <Heading>Build with Carbon and Flint</Heading>
              <p>
                A complete boilerplate with Carbon components, beautiful design,
                and everything you need to start building.
              </p>
            </Stack>
          </Section>

          {components.map((comp, i) => (
            <Layer key={i} as="section">
              <Stack gap={6}>
                <div>{comp.name}</div>
                <div>{comp.demo()}</div>
              </Stack>
            </Layer>
          ))}
        </Stack>
      </Content>
    </>
  );
}
