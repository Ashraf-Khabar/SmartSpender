import React from 'react';

const AboutUsPage = ({ darkModeValue }) => {
    return (
        <div data-theme={darkModeValue} className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base font-semibold tracking-wide uppercase">À propos de nous</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl">
                        Gérez votre budget personnel avec facilité
                    </p>
                </div>

                <div className="mt-10 flex justify-center">
                    <div className="shadow-lg rounded-lg max-w-md">
                        <div className="flex justify-center">
                            <img src="https://www.investopedia.com/thmb/0Ypu-xyMZm-o4sgGf3wNx0I4-G8=/5184x3456/filters:no_upscale():max_bytes(150000):strip_icc()/asset-management-stethoscope-on-money-803260618-0b8b7c0a7b704590bbef239c41c31d44.jpg" alt="About Us" className="w-full h-56 object-cover rounded-t-lg" />
                        </div>
                        <div className="bg-white p-6 rounded-b-lg">
                            <h3 className="text-xl font-semibold text-gray-800">Notre histoire</h3>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Nous sommes une équipe des ingenieurs, etudinats dans l'ENSAT (ecole national des scineces appliques de tanger ), passionnés de la gestion financière personnelle. Nous avons constaté que la plupart des
                                applications de budget existantes étaient trop compliquées à utiliser ou ne répondaient pas aux besoins spécifiques
                                des utilisateurs. Nous avons donc décidé de créer notre propre application de budget personnel facile à utiliser
                                et entièrement personnalisable pour répondre aux besoins de chacun.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <h3 className="text-2xl font-semibold ">Notre équipe</h3>
                    <div className="mt-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white shadow rounded-lg">
                                <div className="p-6">
                                    <img className="w-32 h-32 rounded-full mx-auto" src="https://avatars.githubusercontent.com/u/95541956?v=4" alt="Team member 1" />
                                    <h4 className="mt-4 text-xl font-semibold text-gray-800">Achraf KHABAR</h4>
                                    <p className="mt-2 text-gray-600">Développeur backend, API architect and MongoDb ATLAS cloud manager</p>
                                    <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                            </div>
                            <div className="bg-white shadow rounded-lg">
                                <div className="p-6">
                                    <img className="w-32 h-32 rounded-full mx-auto" src="https://via.placeholder.com/150" alt="Team member 2" />
                                    <h4 className="mt-4 text-xl font-semibold text-gray-800">Jane Smith</h4>
                                    <p className="mt-2 text-gray-600">Développeur backend</p>
                                    <p className="mt-2 text-gray-600">Sed ut perspiciatis unde omnis iste natus</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
