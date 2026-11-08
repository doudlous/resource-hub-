/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  SectionType, 
  AcademicResource, 
  Opportunity, 
  ForumQuestion 
} from './types';
import { 
  INITIAL_ACADEMIC_RESOURCES, 
  INITIAL_OPPORTUNITIES, 
  INITIAL_ROADMAPS, 
  INITIAL_COMMUNITY_EVENTS, 
  INITIAL_FORUM_POSTS 
} from './data/mockData';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { DashboardOverview } from './components/home/DashboardOverview';
import { AcademicResources } from './components/academic/AcademicResources';
import { OpportunitiesBoard } from './components/opportunities/OpportunitiesBoard';
import { LearningResources } from './components/learning/LearningResources';
import { StudentTools } from './components/tools/StudentTools';
import { CommunityEvents } from './components/community/CommunityEvents';
import { SavedItemsView } from './components/saved/SavedItemsView';
import { ResourceDetailModal } from './components/modals/ResourceDetailModal';
import { OpportunityDetailModal } from './components/modals/OpportunityDetailModal';
import { SubmitResourceModal } from './components/modals/SubmitResourceModal';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('overview');
  const [academicResources, setAcademicResources] = useState<AcademicResource[]>(INITIAL_ACADEMIC_RESOURCES);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [forumPosts, setForumPosts] = useState<ForumQuestion[]>(INITIAL_FORUM_POSTS);

  // Saved bookmark IDs
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('somahub_saved');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return ['opp-safaricom-intern-2026', 'res-uon-csc211'];
  });

  useEffect(() => {
    try {
      localStorage.setItem('somahub_saved', JSON.stringify(savedResourceIds));
    } catch {
      // ignore
    }
  }, [savedResourceIds]);

  const toggleSaveResource = (id: string) => {
    setSavedResourceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Search
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Modals
  const [selectedResource, setSelectedResource] = useState<AcademicResource | null>(null);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  // Handlers for dynamic actions
  const handleAddResource = (newRes: AcademicResource) => {
    setAcademicResources((prev) => [newRes, ...prev]);
    setActiveSection('academic');
  };

  const handleAddForumQuestion = (
    q: Omit<ForumQuestion, 'id' | 'upvotes' | 'answersCount' | 'answers'>
  ) => {
    const newPost: ForumQuestion = {
      ...q,
      id: `forum-${Date.now()}`,
      upvotes: 1,
      answersCount: 0,
      answers: [],
    };
    setForumPosts((prev) => [newPost, ...prev]);
  };

  const handleUpvoteForumPost = (postId: string) => {
    setForumPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  const handleAddForumAnswer = (postId: string, content: string) => {
    const newAnswer = {
      id: `ans-${Date.now()}`,
      author: 'Comrade Contributor',
      authorRole: 'Peer Mentor',
      university: 'Kenya Student Network',
      timestamp: 'Just now',
      content,
    };

    setForumPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              answersCount: post.answersCount + 1,
              answers: [...post.answers, newAnswer],
            }
          : post
      )
    );
  };

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Top Bar with Top Bar Contract */}
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        savedCount={savedResourceIds.length}
        onOpenSubmitModal={() => setIsSubmitModalOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Container with Sidebar + Content viewport */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Left Sidebar Navigation */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          academicCount={academicResources.length}
          opportunitiesCount={opportunities.length}
          savedCount={savedResourceIds.length}
        />

        {/* Central Viewport */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {activeSection === 'overview' && (
            <DashboardOverview
              setActiveSection={setActiveSection}
              academicResources={academicResources}
              opportunities={opportunities}
              savedResourceIds={savedResourceIds}
              toggleSaveResource={toggleSaveResource}
              onSelectResource={(res) => setSelectedResource(res)}
              onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
            />
          )}

          {activeSection === 'academic' && (
            <AcademicResources
              resources={academicResources}
              savedResourceIds={savedResourceIds}
              toggleSaveResource={toggleSaveResource}
              onSelectResource={(res) => setSelectedResource(res)}
              globalSearchQuery={searchQuery}
            />
          )}

          {activeSection === 'opportunities' && (
            <OpportunitiesBoard
              opportunities={opportunities}
              savedResourceIds={savedResourceIds}
              toggleSaveResource={toggleSaveResource}
              onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
              globalSearchQuery={searchQuery}
            />
          )}

          {activeSection === 'learning' && (
            <LearningResources
              roadmaps={INITIAL_ROADMAPS}
              globalSearchQuery={searchQuery}
            />
          )}

          {activeSection === 'tools' && <StudentTools />}

          {activeSection === 'community' && (
            <CommunityEvents
              events={INITIAL_COMMUNITY_EVENTS}
              forumPosts={forumPosts}
              onAddForumQuestion={handleAddForumQuestion}
              onUpvoteForumPost={handleUpvoteForumPost}
              onAddForumAnswer={handleAddForumAnswer}
              globalSearchQuery={searchQuery}
            />
          )}

          {activeSection === 'saved' && (
            <SavedItemsView
              savedResourceIds={savedResourceIds}
              academicResources={academicResources}
              opportunities={opportunities}
              toggleSaveResource={toggleSaveResource}
              onSelectResource={(res) => setSelectedResource(res)}
              onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
            />
          )}
        </main>
      </div>

      {/* Clean quiet footer */}
      <Footer setActiveSection={setActiveSection} />

      {/* Detail & Action Modals */}
      <ResourceDetailModal
        resource={selectedResource}
        onClose={() => setSelectedResource(null)}
        isSaved={selectedResource ? savedResourceIds.includes(selectedResource.id) : false}
        onToggleSave={() => selectedResource && toggleSaveResource(selectedResource.id)}
      />

      <OpportunityDetailModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        isSaved={selectedOpportunity ? savedResourceIds.includes(selectedOpportunity.id) : false}
        onToggleSave={() => selectedOpportunity && toggleSaveResource(selectedOpportunity.id)}
      />

      <SubmitResourceModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmit={handleAddResource}
      />
    </div>
  );
}
