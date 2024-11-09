import React, { useRef, useState } from 'react';
import { Boxes, Link2, ExternalLink, Trash2, LineChart } from 'lucide-react';
import { toast } from 'react-toastify';
import { eq } from 'drizzle-orm';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../../utils';
import { project } from '../../../utils/schema';
import { useUser } from '@clerk/nextjs';
import { storage } from '@/utils/firebaseConfig';
import { uploadBytes, ref } from 'firebase/storage';
import Swal from 'sweetalert2';
import { Rnd } from 'react-rnd';

const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/create-ai-4cd98.appspot.com/o';

const ProjectListEdit = ({ projects,refreshData }) => {
    const [selectedOption, setSelectedOption] = useState();
    const { user } = useUser();
    const [profileImage, setProfileImage] = useState('');
    const timeoutRef = useRef(null);  // Ref for debounce handling

    const activeStatusChecked=(value,fieldName,projectId)=>{
        clearTimeout(timeoutRef.current);
        timeoutRef.current=setTimeout(async()=>{
            const result = await db.update(project)
                .set({ [fieldName]: value })
                .where(eq(project.id, projectId));
            if(result){
                toast.success('Updated successfully',{position:'top-right'});
            }else{
                toast.error('Error',{position:'top-right'});
            }
        },1000);
    }


    const onInputChange = (e, fieldName, projectId) => {
        // Clear the timeout on every input change
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(async () => {
            const result = await db.update(project)
                .set({ [fieldName]: e.target.value })
                .where(eq(project.id, projectId));

            if (result) {
                toast.success('Updated successfully', { position: 'top-right' });
            } else {
                toast.error('Error', { position: 'top-right' });
            }
        }, 1000);
    };

    const handleFileUpload = async (e, projectId) => {
        const file = e.target.files[0];

        if (!file) {
            toast.error('No file selected', { position: 'top-right' });
            return;
        }

        const fileType = file.type.split('/')[1];
        const fileName = Date.now().toString() + '.' + fileType;
        const storageRef = ref(storage, fileName);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            toast.success('Image uploaded successfully', { position: 'top-right' });

            const imageUrl = `${baseUrl}/${encodeURIComponent(fileName)}?alt=media`;

            const result = await db.update(project)
                .set({ logo: imageUrl })
                .where(eq(project.id, projectId));

            setProfileImage(imageUrl);
            refreshData();
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Failed to upload image', { position: 'top-right' });
        }
    };

    const onProjectDelete=async(projectId)=>{
        // Delete project
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const data= await db.delete(project).where(eq(project.id,projectId));
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
              refreshData();
              toast.success('Project deleted successfully', { position: 'top-right' });
            }
          });
    }

    React.useEffect(() => {
        // Clear timeout on component unmount
        return () => clearTimeout(timeoutRef.current);
    }, []);

    return (
        <div className='mt-10'>
            {projects.map((item, index) => (
               
                <div key={item.id} className='my-7 p-3 rounded-lg border-r border-b bg-gray-900 border-gray-600'>
                    <div className='flex items-center gap-3'>
                        <label htmlFor={`project-file-input-${item.id}`}>
                            <img src={item.logo || "./upload.png"} alt="msg" className='w-[30px] h-[30px] cursor-pointer' />
                        </label>
                        <input
                            type="file"
                            id={`project-file-input-${item.id}`}
                            style={{ display: 'none' }}
                            accept='image/png, image/jpeg, image/jpg, image/gif'
                            onChange={(e) => handleFileUpload(e, item.id)}  // Pass project ID here
                        />
                        <input
                            type="text"
                            placeholder="Project Name"
                            className="input input-bordered w-full bg-transparent border-gray-600"
                            onChange={(e) => onInputChange(e, 'name', item.id)}
                            defaultValue={item?.name}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Explain your project"
                        className="input input-bordered w-full my-3 text-sm bg-transparent border-gray-600"
                        onChange={(e) => onInputChange(e, 'desc', item.id)}
                        defaultValue={item?.desc}
                    />

                    <div className='flex gap-2 items-center justify-between'>
                        <div className='flex gap-2'>
                        <Boxes
                            className={`h-14 w-14 p-3 mt-5 rounded-md hover:bg-gray-800 cursor-pointer text-purple-500 ${selectedOption === 'category' + index && 'bg-gray-800'}`}
                            onClick={() => setSelectedOption('category' + index)}
                        />
                        <ExternalLink
                            className={`h-14 w-14 p-3 mt-5 rounded-md hover:bg-gray-800 cursor-pointer text-pink-500 ${selectedOption === 'link' + index && 'bg-gray-800'}`}
                            onClick={() => setSelectedOption('link' + index)}
                        />
                        <LineChart 
                            className={`h-14 w-14 p-3 mt-5 rounded-md hover:bg-gray-800 cursor-pointer text-blue-500 ${selectedOption === 'lineChart' + index && 'bg-gray-800'}`}
                            onClick={() => setSelectedOption('lineChart' + index)} />
                        </div>
                        <div className='mt-8 items-center'>
                        <button className='mx-2 text-red-600'
                        onClick={()=>onProjectDelete(item.id)}
                        ><Trash2></Trash2></button>
                        <input type="checkbox" className="toggle toggle-error" 
                        defaultChecked={item?.activeStatus}
                        onChange={(e)=>activeStatusChecked(e.target.checked,'activeStatus',item.id)}  />
                        </div>
                       
                    </div>

                    {selectedOption === 'category' + index && (
                        <div className='mt-3'>
                            <label className="input flex items-center gap-3 p-3 border border-gray-600 bg-transparent rounded-lg shadow-sm">
                                <Boxes className="h-5 w-5 text-purple-400" />
                                <input
                                    type="text"
                                    className="grow bg-transparent text-gray-300 placeholder-gray-400 outline-none"
                                    placeholder="Category"
                                    onChange={(e) => onInputChange(e, 'category', item.id)}
                                    defaultValue={item?.category}
                                />
                            </label>
                        </div>
                    )}

                    {selectedOption === 'link' + index && (
                        <div className='mt-3'>
                            <label className="input flex items-center gap-3 p-3 border border-gray-600 bg-transparent rounded-lg shadow-sm">
                                <ExternalLink className="h-5 w-5 text-pink-400" />
                                <input
                                    type="text"
                                    className="grow bg-transparent text-gray-300 placeholder-gray-400 outline-none"
                                    placeholder="Project url"
                                    onChange={(e) => onInputChange(e, 'url', item.id)}
                                    defaultValue={item?.url}
                                />
                            </label>
                        </div>
                    )}

                    {selectedOption==='lineChart'+index && (
                       <div className='mt-3 flex justify-between  p-4 border border-gray-500 rounded items-center'>
                       <label className='mx-1 mr-2'>Show Visitors Graph</label>
                       <input type="checkbox" className="toggle toggle-info"
                        defaultChecked={item?.showGraph}
                        onChange={(e)=>activeStatusChecked(e.target.checked,"showGraph",item.id)}
                    /> 
                   </div>
                    )}
                </div>
               
            ))}
        </div>
    );
};

export default ProjectListEdit;
