import Tooltip from '@mui/material/Tooltip';

function ToolTip({ title,children }) {
  return <Tooltip title={title}>{children}</Tooltip>;
}

export default ToolTip;
