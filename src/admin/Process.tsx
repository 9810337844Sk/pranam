import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Field } from '../components/ui/field'
import { RichTextEditor } from './RichTextEditor'
import { ImageField } from './ImageField'

interface ProcessStep {
  id: string
  title: string
  description: string
  icon: string
  order: number
}

interface ProcessData {
  title: string
  subtitle: string
  description: string
  steps: ProcessStep[]
}

export default function AdminProcess() {
  const [processData, setProcessData] = useState<ProcessData>({
    title: 'Our Process',
    subtitle: 'How We Work',
    description: 'Our proven methodology for delivering exceptional results',
    steps: []
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // API call to save process data
      await new Promise(resolve => setTimeout(resolve, 1000)) // Mock API call
      setMessage('Process data saved successfully!')
    } catch (error) {
      setMessage('Failed to save process data')
    } finally {
      setIsLoading(false)
    }
  }

  const addStep = () => {
    const newStep: ProcessStep = {
      id: Date.now().toString(),
      title: '',
      description: '',
      icon: '',
      order: processData.steps.length + 1
    }
    setProcessData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }))
  }

  const updateStep = (id: string, field: keyof ProcessStep, value: string | number) => {
    setProcessData(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === id ? { ...step, [field]: value } : step
      )
    }))
  }

  const removeStep = (id: string) => {
    setProcessData(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== id)
    }))
  }

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1>Process Management</h1>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {message && (
        <div className={`alert ${message.includes('successfully') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="admin-form">
        <h2>Process Information</h2>
        
        <Field 
          label="Title" 
          value={processData.title}
          onChange={(e) => setProcessData(prev => ({ ...prev, title: e.target.value }))}
        />
        
        <Field 
          label="Subtitle" 
          value={processData.subtitle}
          onChange={(e) => setProcessData(prev => ({ ...prev, subtitle: e.target.value }))}
        />
        
        <Field 
          label="Description" 
          value={processData.description}
          onChange={(e) => setProcessData(prev => ({ ...prev, description: e.target.value }))}
          as="textarea"
          rows={3}
        />

        <div className="steps-section">
          <div className="section-header">
            <h2>Process Steps</h2>
            <Button variant="ghost" onClick={addStep}>
              + Add Step
            </Button>
          </div>

          {processData.steps.map((step, index) => (
            <div key={step.id} className="step-card">
              <div className="step-header">
                <h3>Step {index + 1}</h3>
                <Button 
                  variant="ghost" 
                  onClick={() => removeStep(step.id)}
                  className="remove-btn"
                >
                  Remove
                </Button>
              </div>
              
              <Field 
                label="Title" 
                value={step.title}
                onChange={(e) => updateStep(step.id, 'title', e.target.value)}
              />
              
              <Field 
                label="Description" 
                value={step.description}
                onChange={(e) => updateStep(step.id, 'description', e.target.value)}
                as="textarea"
                rows={3}
              />
              
              <Field 
                label="Icon (URL or class)" 
                value={step.icon}
                onChange={(e) => updateStep(step.id, 'icon', e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}