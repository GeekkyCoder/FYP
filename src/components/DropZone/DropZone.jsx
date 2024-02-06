import { Dropzone, FileMosaic } from "@files-ui/react";
import Box from "@mui/material/Box"

const DropZone = ({ files, setFiles }) => {
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  return (
    <Box sx={{width:"100%"}}>
    <Dropzone onChange={updateFiles} value={files} accept=".pdf, image/*" maxFiles={2}>
      {files.map((file) => (
        <FileMosaic key={file.id} {...file} onDelete={removeFile} info />
      ))}
    </Dropzone>
    </Box>
  );
};

export default DropZone;
