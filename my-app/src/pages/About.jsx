export default function About() {
  return (
    <div className="min-h-full bg-gray-50 py-6 sm:py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 md:p-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
            About MyApp
          </h1>
          <div className="prose prose-lg max-w-none text-gray-700 text-sm sm:text-base">
            <p className="mb-4 sm:mb-6">
              Welcome to MyApp, a vibrant community-driven platform for photographers and visual artists to share their work with the world. Our mission is to connect talented creators with audiences who appreciate beautiful imagery.
            </p>
            <p className="mb-4 sm:mb-6">
              Whether you're a professional photographer, an amateur enthusiast, or simply someone who loves discovering amazing photos, MyApp provides the perfect space to showcase, discover, and connect through visual storytelling.
            </p>
            <p className="mb-4 sm:mb-6">
              Our platform features a diverse collection of high-quality images across various categories including nature, architecture, urban photography, art, and more. Each photo tells a unique story and represents the creative vision of its talented creator.
            </p>
            <p>
              Join our growing community today and start sharing your perspective with the world!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 