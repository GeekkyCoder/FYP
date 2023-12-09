import { Box } from '@mui/material';
import { useTheme } from '@mui/material';

const WaveSvg = () => {
  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', height: '100px', position: 'relative', top: -30 }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill={`${theme?.palette?.primary?.main}`}
          fill-opacity="1"
          d="M0,224L21.8,224C43.6,224,87,224,131,213.3C174.5,203,218,181,262,181.3C305.5,181,349,203,393,197.3C436.4,192,480,160,524,165.3C567.3,171,611,213,655,224C698.2,235,742,213,785,218.7C829.1,224,873,256,916,272C960,288,1004,288,1047,261.3C1090.9,235,1135,181,1178,186.7C1221.8,192,1265,256,1309,272C1352.7,288,1396,256,1418,240L1440,224L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
        ></path>
      </svg>
    </Box>
  );
};

export default WaveSvg;