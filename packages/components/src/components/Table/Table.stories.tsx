import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Copy,
  Download,
  Trash2,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  Minus,
} from "lucide-react";
import { Table } from "./Table";
import type { TableColumnDef } from "./Table";
import { Badge } from "../Badge/Badge";
import type { BadgeTone } from "../Badge/Badge";
import { AvatarLabelled } from "../AvatarLabelled/AvatarLabelled";
import { IconButton } from "../IconButton/IconButton";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
    docs: {
      subtitle:
        "Used to present information in a clear and organized structure to make it easier to read.",
    },
  },
  argTypes: {
    style: {
      control: "select",
      options: ["Default", "Striped"],
      table: { defaultValue: { summary: "Default" } },
    },
    selectable: {
      control: "boolean",
      table: { defaultValue: { summary: "false" } },
    },
    columns: { table: { disable: true } },
    rows: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// ─── Sample data ───────────────────────────────────

type Employee = {
  name: string;
  email: string;
  src: string;
  role: string;
  status: "Active" | "Inactive" | "Pending" | "On leave";
  tasks: number;
  trend: "up" | "down";
};

const ROWS: Employee[] = [
  {
    name: "Alex Acciano",
    email: "alex@acciano.com",
    src: "https://i.pravatar.cc/40?img=11",
    role: "Product Designer",
    status: "Active",
    tasks: 12,
    trend: "up",
  },
  {
    name: "Sara Lima",
    email: "sara@acciano.com",
    src: "https://i.pravatar.cc/40?img=47",
    role: "Frontend Engineer",
    status: "Active",
    tasks: 8,
    trend: "down",
  },
  {
    name: "Bruno Carvalho",
    email: "bruno@acciano.com",
    src: "https://i.pravatar.cc/40?img=12",
    role: "Data Analyst",
    status: "Inactive",
    tasks: 3,
    trend: "down",
  },
  {
    name: "Camila Rocha",
    email: "camila@acciano.com",
    src: "https://i.pravatar.cc/40?img=49",
    role: "UX Researcher",
    status: "Pending",
    tasks: 5,
    trend: "up",
  },
  {
    name: "Diego Ferreira",
    email: "diego@acciano.com",
    src: "https://i.pravatar.cc/40?img=15",
    role: "Backend Engineer",
    status: "Active",
    tasks: 17,
    trend: "up",
  },
  {
    name: "Elena Souza",
    email: "elena@acciano.com",
    src: "https://i.pravatar.cc/40?img=44",
    role: "Design Lead",
    status: "On leave",
    tasks: 9,
    trend: "up",
  },
  {
    name: "Felipe Martins",
    email: "felipe@acciano.com",
    src: "https://i.pravatar.cc/40?img=18",
    role: "QA Engineer",
    status: "Inactive",
    tasks: 2,
    trend: "down",
  },
  {
    name: "Gabriela Costa",
    email: "gabriela@acciano.com",
    src: "https://i.pravatar.cc/40?img=45",
    role: "Project Manager",
    status: "Active",
    tasks: 14,
    trend: "up",
  },
];

const STATUS_TONE: Record<Employee["status"], BadgeTone> = {
  Active: "Success",
  Inactive: "Critical",
  Pending: "Warning",
  "On leave": "Neutral",
};

const STATUS_ICON = {
  Active: CheckCircle,
  Inactive: XCircle,
  Pending: Clock,
  "On leave": Minus,
} as const;

// ─── Column definitions ────────────────────────────
// Order: Checkbox (selectable), Avatar, Text, Badge, Number, Action icons

const COLUMNS: TableColumnDef[] = [
  {
    id: "avatar",
    heading: "Name",
    sortable: true,
    width: "264px",
    cell: (row) => {
      const r = row as Employee;
      return (
        <AvatarLabelled
          name={r.name}
          email={r.email}
          size="Medium"
          type="Photo"
          src={r.src}
        />
      );
    },
  },
  {
    id: "role",
    heading: "Role",
    cell: (row) => (row as Employee).role,
  },
  {
    id: "status",
    heading: "Status",
    width: "140px",
    cell: (row) => {
      const r = row as Employee;
      return (
        <Badge
          label={r.status}
          tone={STATUS_TONE[r.status]}
          icon={STATUS_ICON[r.status]}
          size="Small"
        />
      );
    },
  },
  {
    id: "tasks",
    heading: "Tasks",
    align: "right",
    gap: "sm",
    width: "120px",
    cell: (row) => {
      const r = row as Employee;
      return r.trend === "up" ? (
        <>
          {r.tasks}
          <TrendingUp size={20} style={{ color: "var(--color-icon-success)" }} aria-hidden />
        </>
      ) : (
        <>
          {r.tasks}
          <TrendingDown size={20} style={{ color: "var(--color-icon-critical)" }} aria-hidden />
        </>
      );
    },
  },
  {
    id: "actions",
    heading: "Actions",
    align: "right",
    width: "240px",
    cell: () => (
      <>
        <IconButton
          icon={Copy}
          variant="Tertiary"
          tone="Neutral"
          size="Medium"
          aria-label="Copy"
        />
        <IconButton
          icon={Download}
          variant="Tertiary"
          tone="Neutral"
          size="Medium"
          aria-label="Download"
        />
        <IconButton
          icon={Trash2}
          variant="Tertiary"
          tone="Critical"
          size="Medium"
          aria-label="Delete"
        />
        <IconButton
          icon={MoreVertical}
          variant="Tertiary"
          tone="Neutral"
          size="Medium"
          aria-label="More options"
        />
      </>
    ),
  },
];

// ─── Stories ───────────────────────────────────────

const TableStory = (args: React.ComponentProps<typeof Table>) => {
  const [page, setPage] = React.useState(1);
  return (
    <Table
      {...args}
      columns={COLUMNS}
      rows={ROWS}
      pagination={{
        currentPage: page,
        totalPages: 8,
        onPageChange: setPage,
        summaryText: "Showing 1 – 8 of 64",
      }}
    />
  );
};

export const Default: Story = {
  render: (args) => <TableStory {...args} />,
  args: {
    style: "Default",
    selectable: true,
    defaultSelectedRows: [],
  },
};

export const Striped: Story = {
  render: (args) => <TableStory {...args} />,
  args: {
    style: "Striped",
    selectable: true,
    defaultSelectedRows: [],
  },
};
