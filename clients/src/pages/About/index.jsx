import React from 'react'
import Section from '../../components/About/Section';
import Card from '../../components/About/card';
import { platformFeatures, teamMembers, statistics } from '../../constants';

const About = () => {
    return (
        <div className="p-6 space-y-6 text-neutral-700 dark:text-neutral-300">
            {/* Introduction */}
            <Section title='Our Mission'>
                <p className="text-sm leading-relaxed">
                    We created this platform to bridge the gap between passionate writers and eager readers.
                    Our goal is to foster a community where quality content thrives and knowledge is accessible to all.
                </p>
            </Section>

            {/* Platform Features */}
            <Section title="Platform Feature">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {platformFeatures.map((feature) => (
                        <Card key={feature.title} iconName={feature.iconName} title={feature.title} description={feature.description} className='flex gap-3' />
                    ))}
                </div>
            </Section>

            {/* Team Section */}
            <Section title='Meet the Team'>
                {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 hover:bg-neutral-100 dark:hover:bg-neutral-700/50 rounded-lg transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sky-100 dark:bg-yellow-900/30 flex items-center justify-center">
                            <span className="text-blue dark:text-golden font-medium">
                                {member.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h4 className="font-medium text-neutral-900 dark:text-white">
                                {member.name}
                            </h4>
                            <p className="text-xs text-blue dark:text-golden">
                                {member.role}
                            </p>
                            <p className="text-xs mt-1 text-neutral-600 dark:text-neutral-400">
                                {member.bio}
                            </p>
                        </div>
                    </div>
                ))}
            </Section>

            {/* Statistics */}
            <Section title='By The Numbers'>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {statistics.map((stat, index) => (
                        <Card
                            key={index}
                            value={stat.value}
                            description={stat.description}
                            className="text-center"
                        />
                    ))}
                </div>
            </Section>

            {/* Footer */}
            <div className="pt-4 mt-4 border-t border-neutral-200 dark:border-neutral-700 text-center">
                <p className="text-sm">
                    Want to join our team?{' '}
                    <button
                        className="text-blue dark:text-golden hover:underline"
                        onClick={() => {
                            onClose();
                        }}
                    >
                        We're hiring!
                    </button>
                </p>
                <p className="text-xs mt-3 text-neutral-500 dark:text-neutral-400">
                    Version {import.meta.env?.REACT_APP_VERSION || '1.0.0'} • Last updated: {new Date().toLocaleDateString()}
                </p>
            </div>
        </div>
    )
}

export default About