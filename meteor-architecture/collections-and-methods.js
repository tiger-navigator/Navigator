import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

// Section 4 of the Tiger Navigator Grant Plan: 12 MongoDB Collections
export const StudentProfiles = new Mongo.Collection('studentProfiles');
export const AcademicRecords = new Mongo.Collection('academicRecords');
export const Experiences = new Mongo.Collection('experiences');
export const Reflections = new Mongo.Collection('reflections');
export const Conversations = new Mongo.Collection('conversations');
export const Competencies = new Mongo.Collection('competencies');
export const ActionPlans = new Mongo.Collection('actionPlans');
export const DualEnrollmentRecords = new Mongo.Collection('dualEnrollmentRecords');
export const EligibilityRules = new Mongo.Collection('eligibilityRules');
export const ScholarRequirements = new Mongo.Collection('scholarRequirements');
export const Resources = new Mongo.Collection('resources');
export const Feedback = new Mongo.Collection('feedback');

// Deterministic Rule Engine (Independent of AI Model per Section 3 of Grant Plan)
export function evaluateDualEnrollmentEligibility(academicRecord, ruleConfig) {
  const { unweightedGpa, actComposite, actEnglish, actMath, actScience } = academicRecord;
  const actualIndex = Math.round((unweightedGpa * 20) + actComposite);

  const generalAdmissionEligible =
    (unweightedGpa >= ruleConfig.generalDeMinGpa && actComposite >= ruleConfig.generalDeMinActComposite) ||
    actualIndex >= ruleConfig.admissionIndexTarget;

  const tsacGrantEligible = unweightedGpa >= ruleConfig.tsacMinGpa;

  return {
    actualIndex,
    generalAdmissionEligible,
    tsacGrantEligible,
    evaluatedAt: new Date(),
    ruleVersion: ruleConfig.version,
  };
}

if (Meteor.isServer) {
  Meteor.methods({
    'calculator.evaluateDualEnrollment'(studentId) {
      const record = AcademicRecords.findOne({ userId: studentId });
      const rules = EligibilityRules.findOne({ active: true });
      return evaluateDualEnrollmentEligibility(record, rules);
    },
    'educator.verifyAcademicRecord'(studentId) {
      if (!Meteor.userId()) throw new Meteor.Error('not-authorized');
      return AcademicRecords.update(
        { userId: studentId },
        { $set: { verifiedByEducator: true, verifiedAt: new Date(), verifiedBy: Meteor.userId() } }
      );
    }
  });
}
