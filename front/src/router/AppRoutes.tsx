import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import SignaturePad from '../components/SignaturePad'
import App from '../App';
import Header from '../components/Header';
import addSignatureToPdf from '../utils/updatePDF';
import LoginForm from '../components/LoginForm';


type Props = {}

function AppRoutes({ }: Props) {
    const [pdfFile, setPdfFile] = useState<string | null>(null);
    const [signedPdfFile, setSignedPdfFile] = useState<string | null>(null);
    const [signatureData, setSignatureData] = useState(sessionStorage.getItem('signature') || null);
    const [authenticated, setAuthenticated] = useState(false);
    const [displayed, setDisplayed] = useState(false);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files == null) return
        const file = event.target.files[0]
        if (file == null) return
        signedPdfFile && setSignedPdfFile(null)
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onload = () => {
                setPdfFile(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            toast.error('Please select a valid PDF file');
        }
    };

    const signPdf = async () => {
        if (!authenticated) {
            setDisplayed(true);
            return
        }
        if (!pdfFile) {
            toast.error('Please select a PDF file')
            return
        }
        if (!signatureData) {
            toast.error('Please provide a signature')
            return
        }
        if (pdfFile && signatureData) {
            const response = await fetch(pdfFile);
            const pdfBytes = await response.arrayBuffer();
            const signedPdfBytes = await addSignatureToPdf({ pdfData: pdfBytes, signatureDataUrl: signatureData });
            const signedPdfBlob = new Blob([signedPdfBytes], { type: 'application/pdf' });
            setSignedPdfFile(URL.createObjectURL(signedPdfBlob));
        }
    };

    return (
        <>
            <BrowserRouter>
                <Toaster position='top-center' closeButton={true} richColors />
                <Header />
                <Routes>
                    <Route path="/" element={<App onFileChange={onFileChange} signPdf={signPdf} pdfFile={pdfFile} setPdfFile={setPdfFile} signedPdfFile={signedPdfFile} setSignedPdfFile={setSignedPdfFile} />} />
                    <Route path="/signature" element={<SignaturePad setSignatureData={setSignatureData} authenticated={authenticated} setDisplayed={setDisplayed} />} />
                </Routes>
                {displayed &&
                    <div className='fixed w-[27rem] h-[15rem] bg-white border-blue-600 border-[2px] top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40  flex flex-col items-center self-center'>
                        <div className='absolute top-[-3%] right-[1%]'>
                            <p className='text-blue-600' style={{ fontSize: '1.5rem', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setDisplayed(false)}>X</p>
                        </div>
                        <LoginForm setDisplayed={setDisplayed} setAuthenticated={setAuthenticated} />
                    </div>}
            </BrowserRouter>
        </>
    )
}

export default AppRoutes