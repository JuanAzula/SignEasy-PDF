import { useRef } from 'react';
import { Button } from '@mui/material';
import { toast } from 'sonner'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = ({ setSignatureData, authenticated, setDisplayed }: any) => {
    const sigCanvas = useRef<SignatureCanvas | null>(null);
    const clear = () => {
        if (sigCanvas.current === null) return
        sigCanvas.current.clear()
    };

    const save: any = async () => {
        if (!authenticated) {
            toast.error('Please authenticate to save your signature');
            setDisplayed(true);
            return
        }
        if (sigCanvas.current === null) return
        const dataURL = sigCanvas.current.toDataURL();
        sessionStorage.setItem('signature', dataURL);
        setSignatureData(dataURL);
    };

    return (
        <>
            <div className='flex ml-4 flex-col mt-8 gap-4 max-xl:w-[50%] w-[30%]'>
                <h4>
                    Write your signature here
                    <ArrowDownwardIcon fontSize="medium" className="text-blue-600 ml-2" />
                </h4>
                < div className='border-solid border-black border-[1px]' >
                    <SignatureCanvas ref={sigCanvas} canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }} />
                </div >
                <div className='flex gap-4 flex-col w-12'>
                    <Button variant='contained' onClick={clear}>Clear</Button>
                    <Button variant='contained' onClick={() => {
                        if (authenticated) {
                            toast.promise(
                                new Promise<any>((resolve, reject) => {
                                    save()
                                        .then(setTimeout(() => resolve({}), 1000))
                                        .catch(reject)
                                }), {
                                loading: 'Saving signature...',
                                success: 'Signature saved!',
                                error: 'Could not add signature'
                            }
                            )
                        } else {
                            setDisplayed(true);
                            toast.error('Please authenticate to save your signature');
                        }
                    }}>Save</Button>
                </div>
            </div >
        </>
    );
};

export default SignaturePad;
