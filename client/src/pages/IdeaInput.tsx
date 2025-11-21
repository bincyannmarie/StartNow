import React, { useState } from 'react';
import { Send, Lightbulb, Eye, CheckCircle } from 'lucide-react';
import FundingProposal from '../components/FundingProposal';
import { useStartup } from '../contexts/StartupContext';

/** 🔐 Same shape as InvestorDashboard expects */
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

const STARTUP_STORAGE_KEY = 'pitchscore_startups';

const IdeaInput: React.FC = () => {
  const { addStartupProject } = useStartup();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    customIndustry: '',
    problemStatement: '',
    solution: '',
    targetMarket: '',
    businessModel: '',
    fundingAmount: '',
    useOfFunds: '',
    teamStructure: '',
    financialProjections: '',
    marketSegmentation: ''
  });

  // Validation functions
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'companyName':
        if (!value.trim()) return 'Company name is required';
        if (value.trim().length < 2) return 'Company name must be at least 2 characters';
        return '';

      case 'industry':
        if (!value) return 'Please select an industry';
        return '';

      case 'customIndustry':
        if (formData.industry === 'other' && !value.trim()) return 'Please specify your industry';
        if (formData.industry === 'other' && value.trim().length < 2) return 'Industry must be at least 2 characters';
        return '';

      case 'problemStatement':
        if (!value.trim()) return 'Problem statement is required';
        if (value.trim().length < 10) return 'Problem statement must be at least 10 characters';
        return '';

      case 'solution':
        if (!value.trim()) return 'Solution description is required';
        if (value.trim().length < 10) return 'Solution must be at least 10 characters';
        return '';

      case 'targetMarket':
        if (!value.trim()) return 'Target market is required';
        if (value.trim().length < 3) return 'Target market must be at least 3 characters';
        return '';

      case 'businessModel':
        if (!value.trim()) return 'Business model is required';
        if (value.trim().length < 3) return 'Business model must be at least 3 characters';
        return '';

      case 'fundingAmount':
        if (!value.trim()) return 'Funding amount is required';
        if (!/^\$?[\d,]+(\.\d{2})?$/.test(value.trim())) return 'Please enter a valid amount (e.g., $500,000)';
        return '';

      case 'useOfFunds':
        if (!value.trim()) return 'Use of funds is required';
        if (value.trim().length < 5) return 'Use of funds must be at least 5 characters';
        return '';

      case 'teamStructure':
        if (!value.trim()) return 'Team structure is required';
        if (value.trim().length < 10) return 'Team structure must be at least 10 characters';
        return '';

      case 'financialProjections':
        if (!value.trim()) return 'Financial projections are required';
        if (value.trim().length < 10) return 'Financial projections must be at least 10 characters';
        return '';

      case 'marketSegmentation':
        if (!value.trim()) return 'Market segmentation is required';
        if (value.trim().length < 10) return 'Market segmentation must be at least 10 characters';
        return '';

      default:
        return '';
    }
  };

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGettingInsights, setIsGettingInsights] = useState(false);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [showInsights, setShowInsights] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [showFundingProposal, setShowFundingProposal] = useState(false);

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1);
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

  const goToStep = (step: number) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    setTouched({
      ...touched,
      [name]: true
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });

    if (name === 'industry') {
      const customIndustryError = validateField('customIndustry', formData.customIndustry);
      setErrors(prev => ({
        ...prev,
        customIndustry: customIndustryError
      }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setTouched({
      ...touched,
      [name]: true
    });

    const error = validateField(name, value);
    setErrors({
      ...errors,
      [name]: error
    });
  };

  // Check if form is complete
  const isFormComplete = () => {
    const requiredFields = [
      formData.companyName,
      formData.industry,
      formData.problemStatement,
      formData.solution,
      formData.targetMarket,
      formData.businessModel,
      formData.fundingAmount,
      formData.useOfFunds,
      formData.teamStructure,
      formData.financialProjections,
      formData.marketSegmentation
    ];

    if (formData.industry === 'other') {
      requiredFields.push(formData.customIndustry);
    }

    return requiredFields.every(field => field.trim() !== '');
  };

  const handleGetAIInsights = async () => {
    setIsGettingInsights(true);

    try {
      console.log('Getting AI insights for:', formData);
      await new Promise(resolve => setTimeout(resolve, 3000));

      const industryName =
        formData.industry === 'other' ? formData.customIndustry : formData.industry;
      const mockInsights = `🎯 **Market Analysis**: Your ${industryName} solution addresses a significant market need. Consider highlighting specific market size data to strengthen your pitch.

💡 **Solution Strength**: Your approach to "${formData.problemStatement}" shows clear value proposition. Consider adding competitive differentiation points.

📈 **Business Model**: Your ${formData.businessModel} model aligns well with industry standards. Consider adding scalability metrics.

🎪 **Target Market**: Targeting ${formData.targetMarket} is strategic. Consider segmentation strategies and customer acquisition costs.

💰 **Funding Strategy**: Your funding request of ${formData.fundingAmount} should be backed by detailed financial projections and milestones.

🚀 **Next Steps**:
- Add market validation data
- Include competitive analysis
- Strengthen financial projections
- Consider adding team credentials`;

      setAiInsights(mockInsights);
      setShowInsights(true);
    } catch (error) {
      console.error('Error getting AI insights:', error);
      alert('Error getting AI insights. Please try again.');
    } finally {
      setIsGettingInsights(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      // Validate all fields
      const newErrors: { [key: string]: string } = {};
      const fieldsToValidate = [
        'companyName',
        'industry',
        'problemStatement',
        'solution',
        'targetMarket',
        'businessModel',
        'fundingAmount',
        'useOfFunds',
        'teamStructure',
        'financialProjections',
        'marketSegmentation'
      ];

      fieldsToValidate.forEach(field => {
        const error = validateField(field, formData[field as keyof typeof formData]);
        if (error) newErrors[field] = error;
      });

      if (formData.industry === 'other') {
        const customIndustryError = validateField('customIndustry', formData.customIndustry);
        if (customIndustryError) newErrors.customIndustry = customIndustryError;
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setTouched(
          fieldsToValidate.reduce(
            (acc, field) => ({ ...acc, [field]: true }),
            {} as { [key: string]: boolean }
          )
        );
        alert('Please fix the validation errors before submitting');
        setIsGenerating(false);
        return;
      }

      const industryName =
        formData.industry === 'other' ? formData.customIndustry : formData.industry;

      /** 🔹 This is the object used by your context */
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

      // ✅ Add the project to the context
      addStartupProject(newStartupProject);

      /** ✅ Also save a simplified version for the Investor Dashboard (localStorage) */
      const newStartupForStorage: StartupForStorage = {
        id: newStartupProject.id,
        name: newStartupProject.name,
        founder: newStartupProject.founder || 'Founder',
        industry: newStartupProject.industry,
        stage: newStartupProject.stage,
        score: 80 + Math.floor(Math.random() * 15), // simple demo score
        fundingNeeded: formData.fundingAmount || '$100,000',
        location: newStartupProject.location === 'TBD' ? 'India' : newStartupProject.location,
        description: newStartupProject.description
      };

      try {
        const raw = localStorage.getItem(STARTUP_STORAGE_KEY);
        let existing: StartupForStorage[] = [];
        if (raw) {
          existing = JSON.parse(raw);
        }
        const updated = [...existing, newStartupForStorage];
        localStorage.setItem(STARTUP_STORAGE_KEY, JSON.stringify(updated));
        console.log('[IdeaInput] Stored pitch for investor view:', newStartupForStorage);
      } catch (err) {
        console.error('[IdeaInput] Failed to store pitch in localStorage:', err);
      }

      // Simulate API call for pitch deck generation
      console.log('Generating pitch deck with data:', formData);
      await new Promise(resolve => setTimeout(resolve, 2000));

      setShowFundingProposal(true);
    } catch (error) {
      console.error('Error generating pitch deck:', error);
      alert('Error generating pitch deck. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Show funding proposal if generated
  if (showFundingProposal) {
    return <FundingProposal formData={formData} onBack={() => setShowFundingProposal(false)} />;
  }

  return (
    <>
      <style>{`
        .screen-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .screen-scrollbar::-webkit-scrollbar-track {
          background: #1F2937;
          border-radius: 4px;
        }
        .screen-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 4px;
        }
        .screen-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6B7280;
        }
        .screen-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4B5563 #1F2937;
        }
      `}</style>
      <div
        className="fixed inset-0 bg-gray-900 overflow-y-auto screen-scrollbar"
        style={{ paddingTop: '120px', paddingBottom: '40px' }}
      >
        <div className="min-h-full flex items-center justify-center px-4">
          <div className="w-3/5">
            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg w-full">
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
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            touched.companyName && errors.companyName
                              ? 'border-red-500 focus:border-red-400'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="Enter your company name"
                        />
                        {touched.companyName && errors.companyName && (
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
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none transition-colors ${
                            touched.industry && errors.industry
                              ? 'border-red-500 focus:border-red-400'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                        >
                          <option value="">Select Industry</option>
                          <option value="technology">Technology</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="finance">Finance</option>
                          <option value="education">Education</option>
                          <option value="retail">Retail</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="other">Other</option>
                        </select>
                        {touched.industry && errors.industry && (
                          <p className="mt-1 text-sm text-red-400">{errors.industry}</p>
                        )}
                      </div>
                    </div>

                    {/* Custom Industry */}
                    {formData.industry === 'other' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Please specify your industry *
                        </label>
                        <input
                          type="text"
                          name="customIndustry"
                          value={formData.customIndustry}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            touched.customIndustry && errors.customIndustry
                              ? 'border-red-500 focus:border-red-400'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="Enter your specific industry"
                        />
                        {touched.customIndustry && errors.customIndustry && (
                          <p className="mt-1 text-sm text-red-400">{errors.customIndustry}</p>
                        )}
                      </div>
                    )}

                    {/* Problem Statement */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Problem Statement *
                      </label>
                      <textarea
                        name="problemStatement"
                        value={formData.problemStatement}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        rows={3}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                          touched.problemStatement && errors.problemStatement
                            ? 'border-red-500 focus:border-red-400'
                            : 'border-gray-600 focus:border-yellow-400'
                        }`}
                        placeholder="Describe the problem your startup solves"
                      />
                      {touched.problemStatement && errors.problemStatement && (
                        <p className="mt-1 text-sm text-red-400">{errors.problemStatement}</p>
                      )}
                    </div>

                    {/* Solution */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Solution *
                      </label>
                      <textarea
                        name="solution"
                        value={formData.solution}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        rows={3}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                          touched.solution && errors.solution
                            ? 'border-red-500 focus:border-red-400'
                            : 'border-gray-600 focus:border-yellow-400'
                        }`}
                        placeholder="Describe your solution"
                      />
                      {touched.solution && errors.solution && (
                        <p className="mt-1 text-sm text-red-400">{errors.solution}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Target Market */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Target Market *
                        </label>
                        <input
                          type="text"
                          name="targetMarket"
                          value={formData.targetMarket}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            touched.targetMarket && errors.targetMarket
                              ? 'border-red-500 focus:border-red-400'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="Who is your target audience?"
                        />
                        {touched.targetMarket && errors.targetMarket && (
                          <p className="mt-1 text-sm text-red-400">{errors.targetMarket}</p>
                        )}
                      </div>

                      {/* Business Model */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Business Model *
                        </label>
                        <input
                          type="text"
                          name="businessModel"
                          value={formData.businessModel}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            touched.businessModel && errors.businessModel
                              ? 'border-red-500 focus:border-red-400'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="How do you make money?"
                        />
                        {touched.businessModel && errors.businessModel && (
                          <p className="mt-1 text-sm text-red-400">{errors.businessModel}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Funding Amount */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Funding Amount Needed *
                        </label>
                        <input
                          type="text"
                          name="fundingAmount"
                          value={formData.fundingAmount}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            touched.fundingAmount && errors.fundingAmount
                              ? 'border-red-500 focus:border-red-400'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="e.g., $500,000"
                        />
                        {touched.fundingAmount && errors.fundingAmount && (
                          <p className="mt-1 text-sm text-red-400">{errors.fundingAmount}</p>
                        )}
                      </div>

                      {/* Use of Funds */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2">
                          Use of Funds *
                        </label>
                        <input
                          type="text"
                          name="useOfFunds"
                          value={formData.useOfFunds}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          required
                          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            touched.useOfFunds && errors.useOfFunds
                              ? 'border-red-500 focus:border-red-400'
                              : 'border-gray-600 focus:border-yellow-400'
                          }`}
                          placeholder="How will you use the funding?"
                        />
                        {touched.useOfFunds && errors.useOfFunds && (
                          <p className="mt-1 text-sm text-red-400">{errors.useOfFunds}</p>
                        )}
                      </div>
                    </div>

                    {/* Team Structure */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Team Structure *
                      </label>
                      <textarea
                        name="teamStructure"
                        value={formData.teamStructure}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        rows={3}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                          touched.teamStructure && errors.teamStructure
                            ? 'border-red-500 focus:border-red-400'
                            : 'border-gray-600 focus:border-yellow-400'
                        }`}
                        placeholder="Describe your team structure, key roles, and team members' expertise"
                      />
                      {touched.teamStructure && errors.teamStructure && (
                        <p className="mt-1 text-sm text-red-400">{errors.teamStructure}</p>
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
                        onBlur={handleBlur}
                        required
                        rows={3}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                          touched.financialProjections && errors.financialProjections
                            ? 'border-red-500 focus:border-red-400'
                            : 'border-gray-600 focus:border-yellow-400'
                        }`}
                        placeholder="Provide revenue projections, growth metrics, and key financial milestones"
                      />
                      {touched.financialProjections && errors.financialProjections && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.financialProjections}
                        </p>
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
                        onBlur={handleBlur}
                        required
                        rows={3}
                        className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors resize-none ${
                          touched.marketSegmentation && errors.marketSegmentation
                            ? 'border-red-500 focus:border-red-400'
                            : 'border-gray-600 focus:border-yellow-400'
                        }`}
                        placeholder="Define your market segments, customer personas, and market size analysis"
                      />
                      {touched.marketSegmentation && errors.marketSegmentation && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.marketSegmentation}
                        </p>
                      )}
                    </div>

                    {/* AI Insights Section */}
                    {isFormComplete() && (
                      <div className="border-t border-gray-700 pt-6 mt-6">
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-semibold text-white mb-2">
                            Get AI Insights
                          </h3>
                          <p className="text-gray-400 text-sm">
                            Get personalized feedback on your pitch before generating the deck
                          </p>
                        </div>

                        <div className="flex justify-center mb-4">
                          <button
                            type="button"
                            onClick={handleGetAIInsights}
                            disabled={isGettingInsights}
                            className={`bg-gray-700 hover:bg-gray-600 border-2 text-white font-medium py-3 px-6 rounded-xl transition-all transform flex items-center space-x-2 ${
                              isGettingInsights
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:scale-105'
                            }`}
                            style={{ borderColor: '#ffee99' }}
                          >
                            {isGettingInsights ? (
                              <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>Analyzing...</span>
                              </>
                            ) : (
                              <>
                                <Lightbulb className="w-5 h-5" />
                                <span>Get AI Insights</span>
                              </>
                            )}
                          </button>
                        </div>

                        {showInsights && aiInsights && (
                          <div className="bg-gray-800 border border-gray-600 rounded-lg p-6 mb-6">
                            <div className="flex items-center mb-4">
                              <Eye className="w-5 h-5 mr-2" style={{ color: '#ffee99' }} />
                              <h4 className="text-lg font-semibold text-white">
                                AI Insights & Recommendations
                              </h4>
                            </div>
                            <div className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
                              {aiInsights}
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-700">
                              <p className="text-xs text-gray-500">
                                💡 These insights are AI-generated suggestions to help improve your
                                pitch. Review and adapt them to your specific situation.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="flex justify-center pt-4">
                      <button
                        type="submit"
                        disabled={isGenerating}
                        className={`text-black font-semibold py-3 px-8 rounded-xl transition-all transform shadow-lg flex items-center space-x-2 ${
                          isGenerating
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:opacity-80 hover:scale-105'
                        }`}
                        style={{ background: '#ffee99' }}
                      >
                        {isGenerating ? (
                          <>
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                            <span>Generating...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Generate Pitch Deck</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IdeaInput;
