import React, { useState } from 'react';
import { Send, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import FundingProposal from '../components/FundingProposal';
import { useStartup } from '../contexts/StartupContext';

const STARTUP_STORAGE_KEY = 'pitchscore_startups';

type StartupForStorage = {
  id: string;
  name: string;
  founder: string;
  industry: string;
  stage: string;
  score: number;
  fundingNeeded: string;
  location: string;
  description?: string;
};

const IdeaInputMultiStep: React.FC = () => {
  const { addStartupProject } = useStartup();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Company Basics
    companyName: '',
    industry: '',
    customIndustry: '',

    // Step 2: Problem & Solution
    problemStatement: '',
    solution: '',
    targetMarket: '',

    // Step 3: Business Model
    businessModel: '',
    marketSegmentation: '',

    // Step 4: Financial Information
    fundingAmount: '',
    useOfFunds: '',
    financialProjections: '',

    // Step 5: Team & Final Details
    teamStructure: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFundingProposal, setShowFundingProposal] = useState(false);

  const totalSteps = 5;

  const stepTitles = [
    'Company Basics',
    'Problem & Solution',
    'Business Model',
    'Financial Information',
    'Team & Final Details'
  ];

  const stepDescriptions = [
    'Tell us about your company and industry',
    'Describe the problem you\'re solving and your solution',
    'Explain your business model and target market',
    'Share your funding needs and financial projections',
    'Provide team information and finalize your pitch'
  ];

  // Step navigation functions
  const nextStep = () => {
    if (validateCurrentStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  // Validate current step
  const validateCurrentStep = () => {
    const newErrors: { [key: string]: string } = {};

    switch (currentStep) {
      case 1: // Company Basics
        if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
        if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
        if (formData.industry === 'other' && !formData.customIndustry.trim()) {
          newErrors.customIndustry = 'Please specify your industry';
        }
        break;
      case 2: // Problem & Solution
        if (!formData.problemStatement.trim()) newErrors.problemStatement = 'Problem statement is required';
        if (!formData.solution.trim()) newErrors.solution = 'Solution description is required';
        if (!formData.targetMarket.trim()) newErrors.targetMarket = 'Target market is required';
        break;
      case 3: // Business Model
        if (!formData.businessModel.trim()) newErrors.businessModel = 'Business model is required';
        if (!formData.marketSegmentation.trim()) newErrors.marketSegmentation = 'Market segmentation is required';
        break;
      case 4: // Financial Information
        if (!formData.fundingAmount.trim()) newErrors.fundingAmount = 'Funding amount is required';
        if (!formData.useOfFunds.trim()) newErrors.useOfFunds = 'Use of funds is required';
        if (!formData.financialProjections.trim()) newErrors.financialProjections = 'Financial projections are required';
        break;
      case 5: // Team & Final Details
        if (!formData.teamStructure.trim()) newErrors.teamStructure = 'Team structure is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep < totalSteps) {
      nextStep();
      return;
    }

    if (!validateCurrentStep()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create startup project from form data
      const industryName =
        formData.industry === 'other' ? formData.customIndustry : formData.industry;

      // 🔹 Type as `any` to silence TS mismatch with context type
      const newStartupProject: any = {
        id: Date.now().toString(),
        name: formData.companyName,
        description: formData.solution,
        industry: industryName,
        stage: 'Pre-Seed',
        fundingGoal: formData.fundingAmount,
        fundingRaised: '$0',
        foundedDate: new Date().getFullYear().toString(),
        location: 'TBD',
        teamSize: 3,
        tags: [industryName, 'Startup', 'New'],
        logo: '🚀',
        images: [
          `https://via.placeholder.com/800x400/1F2937/FFFFFF?text=${encodeURIComponent(
            formData.companyName
          )}`
        ],
        founder: 'Founder',
        website: `www.${formData.companyName.toLowerCase().replace(/\s+/g, '')}.com`,
        pitch: formData.problemStatement,
        businessModel: formData.businessModel,
        targetMarket: formData.targetMarket,
        competition: 'To be analyzed',
        traction: 'Early stage - building MVP',
        financials: {
          revenue: '$0 ARR',
          growth: 'N/A',
          burn: 'TBD'
        }
      };

      // Add the project to the context
      addStartupProject(newStartupProject);

      // ✅ Also save a simplified version for the Investor Dashboard (localStorage)
      const newStartupForStorage: StartupForStorage = {
        id: newStartupProject.id,
        name: newStartupProject.name,
        founder: newStartupProject.founder || 'Founder',
        industry: newStartupProject.industry,
        stage: newStartupProject.stage,
        score: 80 + Math.floor(Math.random() * 15), // simple demo score
        fundingNeeded: formData.fundingAmount || newStartupProject.fundingGoal || '',
        location:
          newStartupProject.location === 'TBD'
            ? 'India'
            : newStartupProject.location || 'India',
        description: newStartupProject.description
      };

      try {
        const raw = localStorage.getItem(STARTUP_STORAGE_KEY);
        const existing: StartupForStorage[] = raw ? JSON.parse(raw) : [];
        localStorage.setItem(
          STARTUP_STORAGE_KEY,
          JSON.stringify([...existing, newStartupForStorage])
        );
        console.log('[IdeaInputMultiStep] Stored pitch for investor view:', newStartupForStorage);
      } catch (err) {
        console.error('[IdeaInputMultiStep] Failed to store pitch in localStorage:', err);
      }

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Navigate to funding proposal
      setShowFundingProposal(true);
    } catch (error) {
      console.error('Error submitting pitch:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showFundingProposal) {
    return <FundingProposal formData={formData} />;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-900 overflow-y-auto"
        style={{ paddingTop: '120px', paddingBottom: '40px' }}
      >
        <div className="min-h-full flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-4xl">
            <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
              <div className="p-8">
                {/* Multi-Step Form Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-2">Submit Your Pitch</h1>
                      <p className="text-gray-400">
                        Step {currentStep} of {totalSteps}: {stepTitles[currentStep - 1]}
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        {stepDescriptions[currentStep - 1]}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-400">
                        {Math.round((currentStep / totalSteps) * 100)}%
                      </div>
                      <div className="text-gray-400 text-sm">Complete</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                    <div
                      className="h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${(currentStep / totalSteps) * 100}%`,
                        background: '#ffee99'
                      }}
                    ></div>
                  </div>

                  {/* Step Indicators */}
                  <div className="flex justify-between mb-8">
                    {stepTitles.map((title, index) => (
                      <div
                        key={index}
                        className={`flex flex-col items-center cursor-pointer transition-all duration-200 ${
                          index + 1 <= currentStep ? 'text-yellow-400' : 'text-gray-500'
                        }`}
                        onClick={() => goToStep(index + 1)}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-2 transition-all duration-200 ${
                            index + 1 < currentStep
                              ? 'bg-yellow-400 text-black'
                              : index + 1 === currentStep
                              ? 'bg-yellow-400 text-black'
                              : 'bg-gray-700 text-gray-400'
                          }`}
                        >
                          {index + 1 < currentStep ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <span className="text-xs text-center max-w-20">{title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Multi-Step Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Company Basics */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Company Name */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                              errors.companyName
                                ? 'border-red-500'
                                : 'border-gray-600 focus:border-yellow-400'
                            }`}
                            placeholder="Enter your company name"
                          />
                          {errors.companyName && (
                            <p className="mt-1 text-sm text-red-400">{errors.companyName}</p>
                          )}
                        </div>

                        {/* Industry */}
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Industry *
                          </label>
                          <select
                            name="industry"
                            value={formData.industry}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none transition-colors ${
                              errors.industry
                                ? 'border-red-500'
                                : 'border-gray-600 focus:border-yellow-400'
                            }`}
                          >
                            <option value="">Select an industry</option>
                            <option value="technology">Technology</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="finance">Finance</option>
                            <option value="education">Education</option>
                            <option value="retail">Retail</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="agriculture">Agriculture</option>
                            <option value="energy">Energy</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.industry && (
                            <p className="mt-1 text-sm text-red-400">{errors.industry}</p>
                          )}
                        </div>
                      </div>

                      {/* Custom Industry Input */}
                      {formData.industry === 'other' && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-300 mb-2">
                            Specify Your Industry *
                          </label>
                          <input
                            type="text"
                            name="customIndustry"
                            value={formData.customIndustry}
                            onChange={handleInputChange}
                            required
                            className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                              errors.customIndustry
                                ? 'border-red-500'
                                : 'border-gray-600 focus:border-yellow-400'
                            }`}
                            placeholder="Enter your industry"
                          />
                          {errors.customIndustry && (
                            <p className="mt-1 text-sm text-red-400">{errors.customIndustry}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Problem & Solution */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      {/* Problem Statement */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Problem Statement *
                        </label>
                        <textarea
                          name="problemStatement"
                          value={formData.problemStatement}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                            errors.problemStatement
                              ? 'border-red-500'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="Describe the problem your startup is solving..."
                        />
                        {errors.problemStatement && (
                          <p className="mt-1 text-sm text-red-400">{errors.problemStatement}</p>
                        )}
                      </div>

                      {/* Solution */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Your Solution *
                        </label>
                        <textarea
                          name="solution"
                          value={formData.solution}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                            errors.solution
                              ? 'border-red-500'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="Explain how your product/service solves the problem..."
                        />
                        {errors.solution && (
                          <p className="mt-1 text-sm text-red-400">{errors.solution}</p>
                        )}
                      </div>

                      {/* Target Market */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Target Market *
                        </label>
                        <textarea
                          name="targetMarket"
                          value={formData.targetMarket}
                          onChange={handleInputChange}
                          required
                          rows={3}
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                            errors.targetMarket
                              ? 'border-red-500'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="Who are your target customers? Define your market..."
                        />
                        {errors.targetMarket && (
                          <p className="mt-1 text-sm text-red-400">{errors.targetMarket}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Business Model */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      {/* Business Model */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Business Model *
                        </label>
                        <textarea
                          name="businessModel"
                          value={formData.businessModel}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                            errors.businessModel
                              ? 'border-red-500'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="How will your startup make money? Describe your revenue model..."
                        />
                        {errors.businessModel && (
                          <p className="mt-1 text-sm text-red-400">{errors.businessModel}</p>
                        )}
                      </div>

                      {/* Market Segmentation */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Market Segmentation *
                        </label>
                        <textarea
                          name="marketSegmentation"
                          value={formData.marketSegmentation}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                            errors.marketSegmentation
                              ? 'border-red-500'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="Break down your target market into segments. Who are your primary, secondary customers?"
                        />
                        {errors.marketSegmentation && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.marketSegmentation}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Financial Information */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      {/* Funding Amount */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Funding Amount Needed *
                        </label>
                        <select
                          name="fundingAmount"
                          value={formData.fundingAmount}
                          onChange={handleInputChange}
                          required
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white focus:outline-none transition-colors ${
                            errors.fundingAmount
                              ? 'border-red-500'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                        >
                          <option value="">Select funding amount</option>
                          <option value="$50K - $100K">$50K - $100K</option>
                          <option value="$100K - $250K">$100K - $250K</option>
                          <option value="$250K - $500K">$250K - $500K</option>
                          <option value="$500K - $1M">$500K - $1M</option>
                          <option value="$1M - $2M">$1M - $2M</option>
                          <option value="$2M - $5M">$2M - $5M</option>
                          <option value="$5M+">$5M+</option>
                        </select>
                        {errors.fundingAmount && (
                          <p className="mt-1 text-sm text-red-400">{errors.fundingAmount}</p>
                        )}
                      </div>

                      {/* Use of Funds */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Use of Funds *
                        </label>
                        <textarea
                          name="useOfFunds"
                          value={formData.useOfFunds}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                            errors.useOfFunds
                              ? 'border-red-500'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="How will you use the funding? Break down the allocation..."
                        />
                        {errors.useOfFunds && (
                          <p className="mt-1 text-sm text-red-400">{errors.useOfFunds}</p>
                        )}
                      </div>

                      {/* Financial Projections */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Financial Projections *
                        </label>
                        <textarea
                          name="financialProjections"
                          value={formData.financialProjections}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                            errors.financialProjections
                              ? 'border-red-500'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="Provide 3-year financial projections including revenue, expenses, and growth expectations..."
                        />
                        {errors.financialProjections && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.financialProjections}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Team & Final Details */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      {/* Team Structure */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Team Structure *
                        </label>
                        <textarea
                          name="teamStructure"
                          value={formData.teamStructure}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className={`w-full px-4 py-3 bg-gray-700 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                            errors.teamStructure
                              ? 'border-red-500'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="Describe your team structure, key roles, and experience..."
                        />
                        {errors.teamStructure && (
                          <p className="mt-1 text-sm text-red-400">{errors.teamStructure}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <button
                      type="button"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors ${
                        currentStep === 1
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-colors bg-yellow-400 text-black hover:bg-yellow-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </>
                      ) : currentStep === totalSteps ? (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Pitch</span>
                        </>
                      ) : (
                        <>
                          <span>Next</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IdeaInputMultiStep;
