import { Loading } from '@/components';
import { getAuthReq } from '@/utils/apiHandlers';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const DonateHistory = () => {
  const [donateHistoryList, setDonateHistoryList] = useState([]);
  const [totalCollection, setTotalCollection] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const take = 8;
  const { userData } = useSelector((state) => state?.user || {});
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const getHistoryList = async (page = 1) => {
    try {
      setIsLoading(true);
      const skip = (page - 1) * take;
      const response = await getAuthReq(
        `/payment/get-all-payments/${userData?.id}?skip=${skip}&take=${take}${
          search ? `&search=${search}` : ''
        }`,
      );
      const { status, data, error } = response;
      if (status) {
        setDonateHistoryList(data?.payments || []);
        setTotalPages(Math.ceil((data?.totalPayments || 0) / take));
      } else {
        if (Array.isArray(error?.message)) {
          toast.error(error.message[0]);
        } else {
          toast.error(error?.message || 'Something went wrong');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch donation history');
    } finally {
      setIsLoading(false);
    }
  };

  const getTotalCollection = async () => {
    try {
      setIsLoading(true);
      const response = await getAuthReq(
        `/payment/total-collection/${userData?.id}`,
      );
      const { status, data, error } = response;
      if (status) {
        setTotalCollection(data);
      } else {
        if (Array.isArray(error?.message)) {
          toast.error(error.message[0]);
        } else {
          toast.error(error?.message || 'Something went wrong');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to fetch donation history');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.id) {
      getTotalCollection();
    }
    // eslint-disable-next-line
  }, [userData?.id]);

  useEffect(() => {
    if (userData?.id) {
      getHistoryList(currentPage, debouncedSearch);
    }
    // eslint-disable-next-line
  }, [userData?.id, currentPage, debouncedSearch]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="border-b w-full bg-[#F8FFFA] border-green-700 ">
        <div className="flex max-w-7xl mx-auto px-5 py-10   flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Donate History</h1>
            <p className="text-sm text-green-600 mt-1">
              🏠 Home &gt;{' '}
              <span className="text-gray-600">Donation History</span>
            </p>
          </div>

          {/* Total Donation Card */}
          <div className="bg-green-50 border border-green-200 p-4 rounded-md mt-6 md:mt-0 shadow text-center">
            <p className="text-sm text-gray-500">Total Donation Amount</p>
            <h2 className="text-2xl font-bold text-green-700 mt-1">
              ₹{totalCollection?.total_collection || 0}
            </h2>
          </div>
        </div>
      </div>

      <div className=" mt-10   ">
        <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow px-6 pt-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search donations..."
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
            </div>
            <div className="w-full md:w-1/3">
              <select className="w-full hidden border border-gray-300 rounded-md px-4 py-2">
                <option>All</option>
                <option>Education Support</option>
                <option>Women Empowerment</option>
                <option>General Fund</option>
              </select>
            </div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border border-gray-200 rounded-md">
              <thead className="bg-green-100 text-green-900 text-sm font-semibold">
                <tr>
                  <th className="text-left px-4 py-2">Purpose of Donation</th>
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {donateHistoryList && donateHistoryList.length > 0 ? (
                  donateHistoryList.map((item, index) => (
                    <tr key={index} className="border-t text-sm text-gray-700">
                      <td className="px-4 py-3">{item.purpose ?? '-'}</td>
                      <td className="px-4 py-3">
                        {moment(item.created_at).format('M/D/YYYY, h:mm A')}
                      </td>
                      <td className="px-4 py-3">₹{item.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="text-center py-6 text-gray-500">
                      No donation history found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6 pb-5 text-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              className="border border-green-500 px-4 py-1 rounded hover:bg-green-100 disabled:opacity-50"
            >
              &larr; Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? 'bg-green-600 text-white'
                    : 'hover:bg-green-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              className="border border-green-500 px-4 py-1 rounded hover:bg-green-100 disabled:opacity-50"
            >
              Next &rarr;
            </button>
          </div>
        </div>

        <div>
          <img src="/images/transaction-bg.png" className="w-full" />
        </div>
      </div>
    </>
  );
};

export default DonateHistory;
