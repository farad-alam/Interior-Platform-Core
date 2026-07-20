import { getProjects, getProjectById, deleteProject, createProject } from './src/core/services/project.service'
import { getServices, deleteService, createService, updateService } from './src/core/services/service.service'
import { getCategories } from './src/core/services/category.service'
import { getSiteSettings, updateSiteSettings } from './src/core/services/settings.service'

async function runTests() {
  console.log('--- STARTING DASHBOARD CRUD TESTS ---')
  let failed = 0

  try {
    console.log('\n1. Testing Category Reading...')
    const categories = await getCategories()
    if (!Array.isArray(categories)) throw new Error('getCategories did not return an array')
    console.log('✅ Categories Read Pass')

    console.log('\n2. Testing Service Creation & Updates...')
    const newService = await createService({
      title: 'Test Service',
      slug: 'test-service',
      description: 'A test service for the dashboard',
      features: ['Test Feature 1', 'Test Feature 2'],
      status: 'DRAFT'
    })
    
    if (!newService || newService.title !== 'Test Service') throw new Error('Service creation failed')
    console.log('✅ Service Create Pass')

    const updatedService = await updateService(newService.id, {
      title: 'Test Service Updated',
      status: 'PUBLISHED'
    })
    if (!updatedService || updatedService.title !== 'Test Service Updated' || updatedService.status !== 'PUBLISHED') throw new Error('Service update failed')
    console.log('✅ Service Update Pass')

    await deleteService(newService.id)
    console.log('✅ Service Delete Pass')

    console.log('\n3. Testing Project Creation & Reading...')
    const categoryId = categories[0]?.id
    if (!categoryId) {
      console.warn('⚠️ No category available, skipping project category attachment')
    }

    const newProject = await createProject({
      title: 'Test Project Alpha',
      slug: 'test-project-alpha',
      description: 'Test project description',
      category: categoryId ? { connect: { id: categoryId } } : undefined,
      status: 'DRAFT',
      images: []
    })
    
    if (!newProject || newProject.title !== 'Test Project Alpha') throw new Error('Project creation failed')
    console.log('✅ Project Create Pass')

    const fetchedProject = await getProjectById(newProject.id)
    if (!fetchedProject || fetchedProject.slug !== 'test-project-alpha') throw new Error('Project read failed')
    console.log('✅ Project Read Pass')

    await deleteProject(newProject.id)
    console.log('✅ Project Delete Pass')

    console.log('\n4. Testing Site Settings Update...')
    const currentSettings = await getSiteSettings()
    
    if (!currentSettings) throw new Error('No SiteSettings found to update. Run seed script first.')

    await updateSiteSettings(currentSettings.id, {
      brandName: 'StudioCore Test',
      email: 'test@test.com'
    })
    
    const updatedSettings = await getSiteSettings()
    if (updatedSettings?.brandName !== 'StudioCore Test') throw new Error('Settings update failed')
    console.log('✅ Settings Update Pass')

    // Restore old settings
    if (currentSettings) {
      await updateSiteSettings(currentSettings.id, {
        brandName: currentSettings.brandName || '',
        email: currentSettings.email || '',
        phone: currentSettings.phone || '',
        instagram: currentSettings.instagram || ''
      })
    }

    console.log('\n🎉 ALL TESTS PASSED!')
  } catch (err: any) {
    console.error('\n❌ TEST FAILED:')
    console.error(err.message)
    failed++
  }

  process.exit(failed > 0 ? 1 : 0)
}

runTests()
