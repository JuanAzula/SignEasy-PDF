import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { version as pdfjsVersion } from 'pdfjs-dist';
import { Button, Input } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


interface AppProps {
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    signPdf: () => Promise<void>;
    pdfFile: string | null;
    signedPdfFile: string | null;
    setPdfFile: React.Dispatch<React.SetStateAction<string | null>>;
    setSignedPdfFile: React.Dispatch<React.SetStateAction<string | null>>
}


const App: React.FC<AppProps> = ({ onFileChange, signPdf, pdfFile, setPdfFile, signedPdfFile, setSignedPdfFile }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    return (
        <>
            <div className="flex gap-4 flex-col">
                <div className='flex flex-row gap-6 mt-[3%] ml-[8%]'>
                    <Input
                        type='file'
                        style={{ display: 'none' }}
                        inputProps={{ accept: '.pdf' }}
                        id="file-upload"
                        onChange={onFileChange}
                        value={''}
                        color='primary' />
                    <label htmlFor="file-upload">
                        <Button variant="contained" color='primary' component="span">UPLOAD PDF</Button>
                    </label>
                    <span>
                        <Button variant="contained" onClick={signPdf}>Sign PDF</Button>
                    </span>
                    {signedPdfFile || pdfFile ?
                        <DeleteForeverIcon
                            fontSize='large'
                            className='cursor-pointer  text-blue-500 hover:text-red-600'
                            onClick={() => {
                                pdfFile && setPdfFile(null);
                                signedPdfFile && setSignedPdfFile(null)
                            }} />
                        : null}
                </div>

                <div className='self-center w-[90%] h-full'>
                    {signedPdfFile &&
                        <iframe src={signedPdfFile} className='h-[800px] mb-10 w-full' title="Signed PDF"
                        />}
                </div>
                {pdfFile && (
                    <div className='w-[90%] self-center mt-4'>
                        <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`}>
                            <Viewer defaultScale={1.5} fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
                        </Worker>
                    </div>
                )}
            </div>
        </>
    );
};

export default App;

