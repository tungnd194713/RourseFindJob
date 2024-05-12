import PostRepository from '~/repositories/PostRepository'
import JobRepository from '~/repositories/JobRepository'
import AccountRepository from '~/repositories/AccountRepository'
import CompanyRepository from '~/repositories/CompanyRepository'
import UserRepository from '~/repositories/UserRepository'
import CandidateRepository from '~/repositories/CandidateRepository'
import CandidateApplyRepository from "~/repositories/CandidateApplyRepository"
import ContactRepository from '~/repositories/ContactRepository'
import PageViewRepository from '~/repositories/PageViewRepository'
import MentorRepository from '~/repositories/MentorRepository'

export default ($axios) => ({
  post: PostRepository($axios),
  jobs: JobRepository($axios),
  accounts: AccountRepository($axios),
  companies: CompanyRepository($axios),
  users: UserRepository($axios),
  candidates: CandidateRepository($axios),
  candidatesApply: CandidateApplyRepository($axios),
  contact: ContactRepository($axios),
  pageviews: PageViewRepository($axios),
  mentors: MentorRepository($axios),
})

